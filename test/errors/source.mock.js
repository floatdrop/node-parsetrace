module.exports = {
    message: 'source.js',
    stack: [
        'Error: source.js',
        '    at Object.<anonymous> (./test/errors/source.js:1:69)',
        '           1: throw new Error(\'source.js\');',
        '    at Module._compile (module.js:456:26)',
        '    at Object.Module._extensions..js (module.js:474:10)',
        '    at Module.load (module.js:356:32)',
        '    at Function.Module._load (module.js:312:12)',
        '    at Function.Module.runMain (module.js:497:10)',
        '    at startup (node.js:119:16)',
        '    at node.js:901:3'
    ].join('\n'),
    answers: {
        functions: [
            'Object.<anonymous>',
            'Module._compile',
            'Object.Module._extensions..js',
            'Module.load',
            'Function.Module._load',
            'Function.Module.runMain',
            'startup',
            undefined
        ],
        lines: [1, 456, 474, 356, 312, 497, 119, 901],
        columns: [69, 26, 10, 32, 12, 10, 16, 3],
        files: [
            './test/errors/simple.js',
            'module.js',
            'module.js',
            'module.js',
            'module.js',
            'module.js',
            'node.js',
            'node.js'
        ],
        source: {
            '1': { 'code': 'throw new Error(\'source.js\');' }
        }
    }
};