/*

computed_properties_safari_bug: {
    options = {
        safari10: true
    }
    input: {
        (function() {
            function f(o) {
                return {[o.key]: o};
            }
            function g(o) {
                return o;
            }
            var obj = {key: "xyz".slice(1, -1)};
            var result = g(f(obj));
            console.log(result);
        })();
    }
    expect: {
        
    }
}

*/
