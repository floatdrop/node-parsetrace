'use strict';

var f = require('pff'),
    fs = require('fs');

function parseMessage(line) {
    return line.substring(line.indexOf(':') + 2);
}

var filesCache = {};

function fetchSource(frame, options) {
    var sourceLines = filesCache[frame.file];
    if (!sourceLines) {
        try {
            var content = fs.readFileSync(frame.file, 'utf8');
            sourceLines = filesCache[frame.file] = content.split('\n');
        } catch (e) {
            if (!options.strict) { return undefined; }
            throw e;
        }
    }

    var source = {};

    var start = Math.max(frame.line - options.contextSize - 1, 0);
    var end = frame.line + options.contextSize;

    sourceLines
        .slice(start, end)
        .forEach(function (line, i) {
            source[i + start + 1] = { code: line };
        });

    return source;
}

function parseFrame(line, options) {

    function namedFrame(line) {
        var re = (/    at (.+) \((.+):(\d+):(\d+)\)/i);
        var match = re.exec(line);

        if (!match && options.strict) {
            throw new Error('Failed to parse frame line: ' + line);
        }

        return {
            function: match[1],
            file: match[2],
            line: parseInt(match[3], 10),
            column: parseInt(match[4], 10)
        };
    }

    function unnamedFrame(line) {
        var re = (/    at (.+):(\d+):(\d+)/i);
        var match = re.exec(line);

        if (!match && options.strict) {
            throw new Error('Failed to parse frame line: ' + line);
        }

        return {
            function: undefined,
            file: match[1],
            line: parseInt(match[2], 10),
            column: parseInt(match[3], 10)
        };
    }

    var frame = line.indexOf('(') !== -1 ? namedFrame(line) : unnamedFrame(line);

    if (!options.sources) { return frame; }

    frame.source = fetchSource(frame, options);

    return frame;
}

function parseSource(frame, line, options) {
    var match = line.match(/^[ ]*(\d+): (.+)$/i);
    frame.source[match[1]] = { code: match[2] };
}

function parseStack(stack, options) {
    var lines = stack.split('\n');
    var message = parseMessage(lines.shift());

    var frames = [];

    lines.forEach(function (line) {
        if (line.indexOf('    at') === 0) {
            frames.push(parseFrame(line, options));
        } else if (/^[ ]+\d+:/.test(line)) {
            var frame = frames[frames.length - 1];
            frame.source = frame.source || {};
            parseSource(frame, line, options);
        }
    });

    return {
        error: message,
        frames: frames
    };
}

function composeString(trace, options) {
    var result = [ 'Error: ' + trace.error ];
    trace.frames.forEach(function (frame) {
        if (frame.function) {
            result.push(f('    at %s (%s:%s:%s)', frame.function, frame.file, frame.line, frame.column));
        } else {
            result.push(f('    at %s:%s:%s', frame.file, frame.line, frame.column));
        }

        if (options.excludeSources || !frame.source) { return; }

        Object.keys(frame.source).forEach(function (line) {
            var code = frame.source[line].code;
            result.push(f(('            ' + line).slice(-12) + ': %s', code));
        });

    });
    return result.join('\n');
}

module.exports = function (error, options, callback) {

    if (typeof(options) === 'function') {
        callback = options;
        options = undefined;
    }

    options = options || {};
    options.contextSize = options.contextSize || 3;

    var trace = parseStack(error.stack, options);

    return {
        object: function () {
            return trace;
        },

        toString: function (options) {
            options = options || {};
            return composeString(trace, options);
        },

        json: function () {
            return JSON.stringify(trace);
        }
    };
};
