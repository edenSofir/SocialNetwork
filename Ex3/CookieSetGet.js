function set_cookie(cookie_name,cookie_value)
{
    document.cookie = cookie_name + "=" + cookie_value + "; path=/";
}

function get_cookie(cookie_name)
{
    let name_cookie = cookie_name + "=";
    let decode_cookie = decodeURIComponent(document.cookie);
    let afer_split =  decode_cookie.split(';');
    for(let i = 0; i<afer_split.length; i++)
    {
        let x = afer_split[i];
        while(x.charAt(0) === ' ')
        {
            x = x.substring(1);
        }
        if(x.indexOf(name_cookie) === 0)
        {
            return x.substring(name_cookie.length,x.length);
        }
    }
    return "";
}