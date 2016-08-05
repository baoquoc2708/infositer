<%

String responseType = request.getParameter("responsetype");
String redirectURL = "pres-web.jsp";

if (responseType != null) { 
    if (responseType.equals("manifest"))
    {
        redirectURL = "app/manifest.json.jsp";
    }
}

%>

<jsp:include page="<%=redirectURL%>" />