// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
var swaggerJson = {};
var definitions = [];
var apiList = [];

function getDef(apiUrl) {
    $.get(apiUrl, function (data) {
        swaggerJson = data;
        for (var k in swaggerJson.definitions) {
            var defData = swaggerJson.definitions[k];
            definitions.push({ key: k, value: fillKeyValue(defData) });
        }
        console.log(definitions);

        for (var path in swaggerJson.paths) {
            var api = swaggerJson.paths[path];
            var apiDef = { path };
            for (var name in api) {
                apiDef.method = name;
            }
            var method = api[apiDef.method]
            apiDef.tag = method.tags.join()
            apiDef.responses = fillKeyValue(method.responses)
            apiDef.parameters = fillKeyValue(method.parameters)
            apiList.push(apiDef);
        }
        console.log(apiList);
        getData()
    });
}

var simpleTypes = ["boolean", "number", "bigint", "string"]
function isComplexData(data) {
    if (data === undefined || data === null) {
        return false;
    } else if (simpleTypes.indexOf(typeof data) !== -1) {
        return false;
    } else {
        return true;
    }

}
function fillKeyValue(data) {
    var props = []
    if (data instanceof Array) {
        for (var i = 0; i < data.length; i++) {
            var item = fillKeyValue(data[i]);
            props.push(item)
        }
    }
    else if (isComplexData(data)) {
        for (var key in data) {
            var objValue = {};
            if (key === "$ref") {
                var refPath = data[key];
                refPath = refPath.split('/').last();
                var refData = swaggerJson.definitions[refPath];
                objValue.refName = refPath;
                objValue.refData = fillKeyValue(refData);
            } else {
                objValue = fillKeyValue(data[key]);
            }
            var p = { key, value: objValue }
            props.push(p);
        }
    } else {
        return data
    }
    return props;
}

function fillRef(data) {
    for (var key in data) {
        if (data.hasOwnProperty(key) && data[key]) {
            if (key === "$ref") {
                var refPath = data[key];
                refPath = refPath.split('/').last();
                var refData = swaggerJson.definitions[refPath];
                data.refName = refPath;
                data.refData = refData;
            } else if (typeof data[key] === "object") {
                data[key] = fillRef(data[key]);
            }
        }

        if (data.hasOwnProperty("parameters")) {
            for (var parameterName in data.parameters) {
                data.parameters.push({ name: parameterName, data: data.parameters[parameterName] })
            }
        }

        if (data.hasOwnProperty("required")) {
            for (var pName in data.properties) {
                data.name = pName;
                if (data.required.join(',').indexOf(pName) !== -1) {
                    data.properties[pName].isRequired = true;
                } else {
                    data.properties[pName].isRequired = false;
                }
            }
        }
    }
    return data;
}


function getData() {
    $("#tdTags tbody").empty();
    apiList.forEach(function (method) {
        $("#tdTags tbody").append('<tr><td><a href="javascript:void(0);" class="show_config"  data-tag="' + method.tag
            + '">' + method.tag + '</a></td>'
            + '<td>' + method.path + '</td>'
            + '<td>' + method.method + '</td>'
            + '<td></td>'
            + '<td> </td>'
            + '</tr>'
        )
    })
}


function bindPage() {

    $("#TagFilter").keypress(function () {
        var row = $("#tdTags tbody tr")
        var filterText = $(this).val().toLowerCase()
        $(row).each(function (i, r) {
            if ($(r).find("td:eq(0)").text().toLowerCase().indexOf(filterText) === -1) {
                $(r).hide();
            } else {
                $(r).show();
            }
        })

    })

    $("#btnSetJson").click(function () {
        $("#configModal").modal();
    })
    $("#tdTags tbody").on("click", ".show_config", function () {
        var tag = $(this).attr("data-tag");
        $("#ListMethod,#CreateMethod,#UpdateMethod,#DeleteMethod").empty()
        var frm = $("form");
        frm.find("#TagName").val(tag);
        var allTags = [];

        $("#ListMethod,#CreateMethod,#UpdateMethod,#DeleMethod").append("<option value='None'>None</option>");
        apiList.forEach(function (item) {
            if (item.tag === tag) {
                $("#ListMethod,#CreateMethod,#UpdateMethod,#DeleteMethod")
                    .append("<option value='" + item.path + "'>" + item.path + "</option>");
                allTags.push(item);
            }
        })

        allTags.forEach(function (it) {
            var p = it.path.toLowerCase().split('/').last();
            if (p.indexOf("getall") > -1) {
                $("#ListMethod").val(it.path);
            } else if (p.indexOf("create") !== -1) {
                $("#CreateMethod").val(it.path);
            } else if (p.indexOf("update") !== -1 || p.indexOf("edit") !== -1) {
                $("#UpdateMethod").val(it.path);
            } else if (p.indexOf("delete") !== -1) {
                $("#DeleteMethod").val(it.path);
            }

        });

        $("#configModal").modal();
        var config = getConfig(tag);
        if (config)
            for (var i = 0; i < config.length; i++) {
                var p = config[i];
                $('#' + p.name).val(p.value);
            }

        $("#ListMethod,#CreateMethod,#UpdateMethod,#DeleteMethod").change(function () {
            var jsonData = apiList.find(o => o.path === $(this).val());
            $(this).parent().find("textarea").val(JSON.stringify(jsonData))
            bindApiConfig();
        })
        $("input[type=text]").change(function () {
            if ($(this).val().startsWith("JSON.")) {
                $(this).val($(this).val().replace('JSON.', ''))
            }
        })

        //$("#ListMethod,#CreateMethod,#UpdateMethod,#DeleteMethod").each(function (i, item) { 
        //    bindApiConfig();
        //})
        bindApiConfig();

    });

    $(".container #btnSubmit").click(function () {
        var frm = $("#gencode");

        console.log($("#JsonData").val())
        updateConfig($("#TagName").val(), $("#gencode").serializeArray())

        frm.submit();

    })


    function bindApiConfig() {
        var apiConfig = {
            tag: $("#TagName").val(),
            ListApi: apiList.find(o => o.path === $("#ListMethod").val()),
            CreateApi: apiList.find(o => o.path === $("#CreateMethod").val()),
            UpdateApi: apiList.find(o => o.path === $("#UpdateMethod").val()),
            DeleteApi: apiList.find(o => o.path === $("#DeleteMethod").val())
        }
        $("#JsonData").val(JSON.stringify(apiConfig));
    }
}

function JsonPath(json, path) {
    $.post('/home/TestJsonPath', { Json: JSON.stringify(json), JsonPath: path }, function (data) {
        alert(JSON.stringify(data));
        console.log(data);
    });
}
Array.prototype.last = function () {
    var len = this.length
    return this[len - 1];
}

function updateConfig(tag, configData) {
    var savedConfig = getConfig(tag)
    if (!savedConfig) {
        savedConfig = {}
    }
    savedConfig[tag] = configData;
    localStorage.setItem("ConfigData", JSON.stringify(savedConfig));
}
function getConfig(tag) {
    var savedConfig = localStorage.getItem("ConfigData");
    if (savedConfig === null || savedConfig === 'null') {
        return {};
    }
    return JSON.parse(savedConfig)[tag];
}

function tryGetProp(path, modal, templateName) {

    var json = JSON.parse($("#tryJsonData").val());
    if (!templateName) {
        templateName = 'Json';
    }

    if (modal) {
        $("#tryJson").modal();
    }
      
    if (templateName === "Json") {
        $.post('/home/TryGetProps', {
            Json: JSON.stringify(json),
            JsonPath: path,
            templateName: 'Json'
        }, function (data) {
            console.log(data);
            $("#Result").val(JSON.stringify(data));
        });
    } else {
        var jsonStr = $("#tryJsonData").val();
        console.log("1")
        $.post('/home/GetPartCode', { Json: jsonStr, JsonPath: path, templateName: templateName }, function (data) {
            console.log(data); 
            console.log("3")
            $("#Result").val(data);
        });
        console.log("2")
    }
   

}