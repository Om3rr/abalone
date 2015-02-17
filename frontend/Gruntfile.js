module.exports = function(grunt) {
  "use strict";

  var path = require("path");
  var cwd = process.cwd();
  var tsJSON = {
    abalone: {
      src: ["src/ts/abalone/*.ts", "typings/**/*.d.ts"],
      out: "build/abalone.js",
      options: {
        declaration: true,
        sourceMap: false
      },
    },
    main: {
      src: ["src/ts/main/*.ts", "build/**/*.d.ts", "typings/**/*.d.ts"],
      out: "build/main.js",
      options: {
        declaration: true,
        sourceMap: false
      },
    },
    test: {
      src: ["test/*.ts", "typings/**/*.d.ts", "build/**/*.d.ts"],
      out: "build/test.js",
      options: {
        sourceMap: false
      },
    },
  };

  var watchJSON = {
    ts: {
      options: {
        livereload: true,
        atBegin: true
      },
      tasks: ["buildts"],
      files: ["src/ts/**/*.ts", "test/**/*.ts"]
    },
    watchreact: {
      tasks: ["react"],
      files: ["src/jsx/*.jsx"]
    }
  }

  var configJSON = {
    pkg: grunt.file.readJSON("package.json"),
    ts: tsJSON,
    tslint: {
      options: {
        configuration: grunt.file.readJSON("tslint.json")
      },
      files: ["src/**/*.ts", "test/**.ts"]
    },
    watch: watchJSON,
    react: {
      combined_file_output: {
        files: {
        'build/react_main.js': ['src/jsx/*.jsx']
        }
      }
    },
    mocha: {
      test: {
        src: ['test/test.html'],
        options: {
          run: true
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 9999,
          base: "",
          livereload: true
        }
      }
    },
    clean: {
      tscommand: ["tscommand*.tmp.txt"]
    },
  };

  // project configuration
  grunt.initConfig(configJSON);

  require('load-grunt-tasks')(grunt);

  grunt.registerTask("buildts", [
                                  "ts:abalone",
                                  "ts:main",
                                  "ts:test",
                                  "clean",
                                  "tslint",
                                  "mocha"]);

  grunt.registerTask("tsrunner", ["connect", "watch:ts", "buildts", ]);
  grunt.registerTask("r", ["connect", "react", "watch:watchreact"])

  // default task (this is what runs when a task isn't specified)
  grunt.registerTask("default", ["tsrunner"]);
};
