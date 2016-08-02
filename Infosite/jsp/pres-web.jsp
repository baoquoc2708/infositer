<!DOCTYPE html>
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="minimal-ui, width=device-width, initial-scale=1, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="description" content="">
        <meta name="robots" content="noindex, nofollow">
        <meta name="format-detection" content="telephone=no">

        <title>Information From Industry</title>
        <%@ page isELIgnored="false"%>
        <%@ taglib uri="/WEB-INF/tld/prof-customtags.tld" prefix="medscape" %>
        <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
        <%@ include file="/files/common/useragent/list.jsp" %>
        <%@ taglib uri="/WEB-INF/tld/ipp.tld" prefix="ipp" %>
        <%-- <%@ taglib uri="/WEB-INF/tld/c.tld" prefix="c" %> --%>

        <%@ page import="com.webmd.util.CommonAttributes" %>
        <%@ page import="com.webmd.registration.core.User" %>

        <%
            User user = null;
            user = (User) session.getAttribute(CommonAttributes.MEMBERINFO);
        %>

        <%-- GM taglib --%>
        <%@ taglib uri="/WEB-INF/tld/gmtags.tld" prefix="gm"%>

        <c:set var="seriesId" value="7" />
        <c:set var="activityId" value="14480" />
        <c:set var="tacticId" value="11161" />
        <c:set var="sfNum" value="14480_1" />
        <c:set var="subTitle" value="Information From Industry" />

        <%-- Meta tags --%>
        <meta data-cp='{"tacticId":"<c:out value="${tacticId}" />", "activityId": "<c:out value="${activityId}" />", "parId":"<ipp:sessionVar key='par_id' />"}' />

        <meta data-ipp='{"tacticId":"<c:out value="${tacticId}" />", "activityId": "<c:out value="${activityId}" />", "parId":"<ipp:sessionVar key='par_id' />", "parIdE":"<ipp:sessionVar key='par_id' encrypt='true' encode='true'/>", "wpUrl": "<medscape:domain type="wpServer" />", "sfNum": "<c:out value="${sfNum}" />"}' />

        <meta data-tracking='{"sfNum":"<c:out value="${sfNum}" />"}' />

        <%-- This meta tag is used for the hash override. You can either specify the
            Asset Name OR the Module Name --%>
        <meta data-hash='{"14480_1-scene-5":"123456","vsp-extlink_mgLink":"78910"}'/>

        <meta data-engagement='{"feature":"true","toastAlert":"true","toastAlertTime":"3","defaultStart":"false","scn3":"scn6"}'/>

        <meta name="metaref" content="<%=request.getHeader("referer")%>">


        <%-- CSS START--%>
            <link rel="stylesheet" href="http://<medscape:domain type="imageServer"/>/medcss/features/ba2/style.css">
            <link rel="stylesheet" href="http://<medscape:domain type="imageServer"/>/medcss/features/ba2/instances/7/14480/instance.css">

            <%-- APP CSS (When if we have one)
            <medscape:includeif userAgent='<%=li1 + ",ipad"%>'>
                <medscape:includeif isApp="Y">

                </medscape:includeif>
            </medscape:includeif> --%>
        <%-- CSS END--%>

        <%-- GLOBAL JS START--%>
            <%-- For Global Scripts which must execute before content, all other scripts at the end of the file --%>
        <!-- GM variables -->
        <!--script type="text/javascript" src="http://img.medscapestatic.com/pi/scripts/jquerylib/jquery-desktop.js"></script>
        <script type="text/javascript">
            var autoSelectGift = true;
            var defaultAdd = 1;
            var onlyUS = true;
            var emailNoProfile = true;
            var packageId = '%2BqvxgVUX6sW63gat06lvdA%3D%3D';
            var promoActivityId = 'GyGHJGRk1aYQZVihtEIw2Q%3D%3D';
            var tokenId= "<gm:token packageId='698' expirationDate='06/30/2016'/>";
        </script-->
        <%--GLOBAL JS END--%>

    </head>
    <body>

        <%-- <medscape:includeif userAgent='<%=li1 + ",ipad"%>'>
            <div id="blocker" class="landscape-blocker">
                <p>Please rotate your device, landscape mode not supported.</p>
            </div>
        </medscape:includeif> --%>

        <%-- Sticky Header at top of page --%>
        <div id="header" class="header">

            <%-- Generic Medscape Promo Header including medscape links and disclaimer --%>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/components/headers/chrome-header.jsp" %>

            <%-- Brand Header including logo and information links --%>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/components/headers/brand-header.jsp" %>

            <%-- Progress Bar Component --%>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/components/progress-bar.jsp" %>

        </div>

        <medscape:includeif userAgent='<%=li1 + ",ipad"%>'>
            <%-- Includes the scroll indicator component --%>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/components/scroll-indicator-1.jsp" %>
        </medscape:includeif>

        <div class="restart-resume"></div>

        <div id="block1" class="block">
            <%-- Includes for Scenes | contained in /files/mscp_sites/www/sp/ipp/7/14480/scenes/ folder --%>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/scenes/scene-1.jsp" %>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/scenes/scene-2.jsp" %>
        </div>



        <div id="block2" class="block">

            <%-- Includes for Scenes | contained in /files/mscp_sites/www/sp/ipp/7/14480/scenes/ folder --%>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/scenes/scene-3.jsp" %>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/scenes/scene-4.jsp" %>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/scenes/scene-5.jsp" %>
        </div>



        <div id="block3" class="block">

            <%-- Includes for Scenes | contained in /files/mscp_sites/www/sp/ipp/7/14480/scenes/ folder --%>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/scenes/scene-6.jsp" %>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/scenes/scene-7.jsp" %>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/scenes/scene-8.jsp" %>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/scenes/scene-9.jsp" %>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/scenes/scene-10.jsp" %>
        </div>



        <!-- ISI Panel -->
        <div id="isi" class="isi" data-final-state-time="2">
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/components/isi.jsp" %>
        </div>



        <%-- Scripts --%>
        <script src="http://<medscape:domain type="imageServer"/>/pi/scripts/ba2/svg.js"></script>
        <script src="http://<medscape:domain type="imageServer"/>/pi/scripts/ba2/ba2.bundle.js"></script>
        <script src="http://<medscape:domain type="imageServer"/>/pi/scripts/ba2/video_config.js"></script>
        <script src="http://<medscape:domain type="imageServer"/>/pi/scripts/vendor/jquery/jquery-1.10.1.min.js"></script>
        <script src="http://<medscape:domain type="imageServer"/>/pi/scripts/features/giftmanager/gm_ba2.js"></script>
        <script src="http://<medscape:domain type="imageServer"/>/pi/scripts/vendor/md5/md5.js"></script>
        <script src="http://<medscape:domain type="imageServer"/>/pi/scripts/ba2/core.js"></script>
        <script src="http://<medscape:domain type="imageServer"/>/pi/scripts/ba2/tracking.js"></script>
        <script src="http://<medscape:domain type="imageServer"/>/pi/scripts/ba2/brandAdvance2.js"></script>
        <script src="http://<medscape:domain type="imageServer"/>/pi/sp/ipp/7/14480/js/ba2_instance.js"></script>
        
        <!-- Any script tags which need to or can execute at the end here-->
        
        <%@ include file="/files/common/footer/footer-blank-promo.jsp" %>

    </body>
</html>
