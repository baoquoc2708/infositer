<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8">
			<meta name="robots" content="noindex, nofollow">
			<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0" >
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="format-detection" content="telephone=no">

			<title>Information from Industry</title>
			
			<%@ taglib uri="/WEB-INF/tld/beacons.tld" prefix="beacons" %>
			<%@ include file="/files/common/useragent/list.jsp" %>
			<%@ taglib uri="/WEB-INF/tld/prof-customtags.tld" prefix="medscape" %>
			<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
			<%@ taglib uri="/WEB-INF/tld/ipp.tld" prefix="ipp" %>
			
			<%-- GM taglib --%>
        	<%@ taglib uri="/WEB-INF/tld/gmtags.tld" prefix="gm"%>


        	<%-- USERS' INFO START --%>
            <%@ page import="com.webmd.util.CommonAttributes" %>
            <%@ page import="com.webmd.registration.core.User" %>
            <%
                User user = null;
                user = (User) session.getAttribute(CommonAttributes.MEMBERINFO);
            %>
        	<%-- USERS' INFO END --%>

        	<%-- Meta Data tags --%>
	        <c:set var="activityId" value="xyz" />
	        <c:set var="tacticId" value="00000" />
	        <c:set var="sfNum" value="xyz_1" />
	        
	        <meta data-cp='{"tacticId":"<c:out value="${tacticId}" />", "activityId": "<c:out value="${activityId}" />", "parId":"<ipp:sessionVar key='par_id' />"}' />

	        <meta data-ipp='{"tacticId":"<c:out value="${tacticId}" />", "activityId": "<c:out value="${activityId}" />", "parId":"<ipp:sessionVar key='par_id' />", "parIdE":"<ipp:sessionVar key='par_id' encrypt='true' encode='true'/>", "wpUrl": "<medscape:domain type="wpServer" />", "sfNum": "<c:out value="${sfNum}" />"}' />

        	<%-- CSS START--%>
        	<%-- Main CSS--%>
        	<%-- Instance CSS--%>
        	<%-- CSS END--%>
		</head>
		<body>
			<div class='header'>
				<%@ include file="/files/mscp_sites/www/infosite/salutrib/components/header.jsp" %>
			</div>

			<div class='main-wrapper'>
			</div>

			<div class='footer'>
				<%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/scenes/scene-1.jsp" %>
			</div>

			<%-- Scripts --%>
			<%-- Configuration JS--%>
			<%-- Main JS--%>
			<%-- Instance JS--%>

			<%-- Common Footer Include --%>
			<%@ include file="/files/common/footer/footer-blank-promo.jsp" %>
		</body>
	</html>