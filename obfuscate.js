function generateObfuscatedLink(str)
{
    var key = Math.floor(Math.random() * 126);

    var word = obfuscate(str, key);
    word = encodeURIComponent(word);

    var link = window.location.href;
    if (link.indexOf("?") != -1)
    {
        link = link.substr(0, link.indexOf("?"));
    }
    link += "?key=" + key + "&";
    link += "word=" + word;

    return link;
}

function getObfuscatedWord()
{
    var key = getUrlParam(location.search, "key");
    var str = getUrlParam(location.search, "str") || getUrlParam(location.search, "word");
    if (str != '')
    {
        var word = deobfuscate(str, key);
        return word;
    }
    return -1;
}

function getUrlParam(search, name)
{
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var rgx = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = rgx.exec(search);
    if (results === null)
        return '';
    else
        return decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function obfuscate(str, key)
{

    var chars = str.split('');
    for (var i = 0; i < chars.length; i++)
    {
        var c = chars[i].charCodeAt(0);
        if (c <= 126)
            chars[i] = String.fromCharCode((chars[i].charCodeAt(0) + key) % 126);
    }
    return chars.join('');
}

function deobfuscate(str, key)
{
    var word = obfuscate(str, 126-key);
    return word;
}
