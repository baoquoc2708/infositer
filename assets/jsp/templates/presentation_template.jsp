<!DOCTYPE html>
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" class="no-js"> <!--<![endif]-->
    <head>

        <%-- Title of the program --%>
        <title>Information From Industry</title>

        <%-- DEFAULT META TAGS START --%> 
            <meta charset="utf-8">
            <meta name="viewport" content="initial-scale=1.0001, minimum-scale=1.0001, maximum-scale=1.0001, user-scalable=no">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="description" content="">
            <meta name="robots" content="noindex, nofollow">
            <meta name="format-detection" content="telephone=no">
        <%-- DEFAULT META TAGS END --%>

        <%-- JAVA TAGLIBS START --%>
            <%@ page isELIgnored="false"%>
            <%@ taglib uri="/WEB-INF/tld/prof-customtags.tld" prefix="medscape" %>
            <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
            <%@ include file="/files/common/useragent/list.jsp" %>
            <%@ taglib uri="/WEB-INF/tld/ipp.tld" prefix="ipp" %>
        <%-- JAVA TAGLIBS END --%>

        <%-- USERS' INFO START --%>
            <%@ page import="com.webmd.util.CommonAttributes" %>
            <%@ page import="com.webmd.registration.core.User" %>
            <%
                User user = null;
                user = (User) session.getAttribute(CommonAttributes.MEMBERINFO);
            %>
        <%-- USERS' INFO END --%>

        <%-- GM TAGLIBS --%>
        <%@ taglib uri="/WEB-INF/tld/gmtags.tld" prefix="gm"%>

        <%-- PROGRAM VARIABLES START --%>
            <c:set var="seriesId" value="7" />
            <c:set var="activityId" value="14480" />
            <c:set var="tacticId" value="11161" />
            <c:set var="sfNum" value="14480" />
            <c:set var="subTitle" value="Information From Industry" />
        <%-- PROGRAM VARIABLES END --%>

        <%-- CUSTOM META TAGS START --%>
            <%-- The data-cp meta tag is used to capture events in CP for use in setting up re-engagement, dynamic content and follow up marketing. Thhis tag requires the site-footer which includes the CP function. We are tracking: 
                * Start of program (on load)
                * When content becomes visible
                * On scene view
                * Viewing the last scene
                * Browser/tab closing 
            --%>
                <meta data-cp='{"tacticId":"<c:out value="${tacticId}" />", "activityId": "<c:out value="${activityId}" />", "parId":"<ipp:sessionVar key='par_id' />"}' />

            <%-- The data-ipp meta tag is used to track engagement and participation. We track these actions: 
                * When content becomes visible
                * Viewing last scene 
                * Closing browser/tab --%>
                <meta data-ipp='{"tacticId":"<c:out value="${tacticId}" />", "activityId": "<c:out value="${activityId}" />", "parId":"<ipp:sessionVar key='par_id' />", "parIdE":"<ipp:sessionVar key='par_id' encrypt='true' encode='true'/>", "wpUrl": "<medscape:domain type="wpServer" />", "sfNum": "<c:out value="${sfNum}" />"}' />

            <%-- The data-tracking meta tag is used for the Omniture tracking. 
                You add it to the element you need to track. If you keep it empty then it takes the overall hash.
                If you enter a value than it will be used as ID for that element ant the hash will be generated based on that value --%>
                <meta data-tracking='{"sfNum":"<c:out value="${sfNum}" />","version":"1"}' />

            <%-- The data-hash meta tag is used for the hash override. You can either specify the
                Asset Name OR the Module Name and enter the new hash value --%>
                <meta data-hash='{"14480_1-scene-5":"123456","vsp-extlink_mgLink":"78910"}'/>

            <%-- The data-engagement meta tag is used to activate/deactivate the Remember me feature. 
                To activate it you must set 'feature' to "true". Otherwise if it's false or does not exist it means that "Remember me" it's off. If active, the next time that the user goes back to the program it will jump to the next scene and a toast alert will be displayed with the "You last viewed" message. To disable that toast alert you can turn it off by setting 'toastAlert' to "false". Also, if active, you can edit the fading time by changing it directly in "toastAlertTime".
                To force the user to always start from the first scene, you can do that by setting 'defaultStart' to "true", this will disable the "jump to next scene" feature.
                If 'defaultStart' is set to "true" the you activate the "jump to next scene" feature and you can redirect a user who viewed sceneX to sceneY. To do so you can add that right in this data attribute by indicating "from":"to": "scn3":"scn6".
                Finally, to create a direct link, you can just append "&scene=[SCENE NUMBER]" to the URL.--%>
                <meta data-engagement='{"feature":"true","toastAlert":"true","toastAlertTime":"3","defaultStart":"FALSE","scn3":"scn6","scn7":"scn9"}'/>

            <%-- This meta tag is required to check and verify the referrer  for mobile devices --%>
                <meta name="metaref" content="<%=request.getHeader("referer")%>">
        <%-- CUSTOM META TAGS END --%>

        <%-- CSS START--%>
            <%-- Default styles --%>
            <link rel="stylesheet" href="http://<medscape:domain type="imageServer"/>/medcss/features/ba2/style.css">
            <%-- Customizable styles (instance level) --%>
            <link rel="stylesheet" href="http://<medscape:domain type="imageServer"/>/medcss/features/ba2/instances/7/14480/instance.css">

            <%-- APP CSS (When if we have one)
            <medscape:includeif userAgent='<%=li1 + ",ipad"%>'>
                <medscape:includeif isApp="Y">
                </medscape:includeif>
            </medscape:includeif> --%>
        <%-- CSS END--%>

        <%-- GLOBAL JS START--%>
            <%-- For Global Scripts which must execute before content, all other scripts at the end of the file --%>
            <!-- GM Scripts -->
                <script type="text/javascript" src="http://img.medscapestatic.com/pi/scripts/jquerylib/jquery-desktop.js"></script>
                <script type="text/javascript">
                    var autoSelectGift = true;
                    var defaultAdd = 1;
                    var onlyUS = true;
                    var emailNoProfile = true;
                    var packageId = '%2BqvxgVUX6sW63gat06lvdA%3D%3D';
                    var promoActivityId = 'GyGHJGRk1aYQZVihtEIw2Q%3D%3D';
                    var tokenId= "<gm:token packageId='698' expirationDate='06/30/2016'/>";
                </script>
        <%-- GLOBAL JS END--%>

    </head>
    <body>

    <%-- BLOCKER: Is used for mobile devices to block the user from viewing the program in a specific orientation.
        You must use the "blocker" ID name and use one of these two classes:
            * landscape-blocker: This class activate the blocker for landscape mode
            * portrait-blocker: This class activate the blocker for portrait mode --%>
        <medscape:includeif userAgent='<%=li1 + ",ipad"%>'>
            <div id="blocker" class="landscape-blocker">
                <p>Please rotate your device, landscape mode not supported.</p>
            </div>
        </medscape:includeif>

    <%-- Sticky Header at top of page --%>
        <div id="header" class="header">

        <%-- Generic Medscape Promo Header including medscape links and disclaimer --%>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/components/headers/chrome-header.jsp" %>

        <%-- Brand Header including logo and information links --%>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/components/headers/brand-header.jsp" %>

        <%-- Progress Bar Component --%>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/components/progress-bar.jsp" %>

        <!-- ISI Panel Option 1: Top ISI -->
            <div id="isi" class="isi">
                <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/components/isi.jsp" %>
            </div>

        </div>

    <%-- Scroll indicator, active for mobile only --%>
        <medscape:includeif userAgent='<%=li1 + ",ipad"%>'>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/components/scroll-indicator-1.jsp" %>
        </medscape:includeif>

    <%-- This div is used for the Remember me feature. The class "restart-resume" displays that toast alert --%>
        <div class="restart-resume"></div>

    <%-- The scenes can either be grouped by blocks or only scenes. If you need to use blocks, the ID must respect
        the structure "block[NUMBER]". For example if you will have three blocks, you will ad these IDs:
            block1, block2 and block3 
        Finally, the class "block" is also required. --%>
        <div id="block1" class="block">
            <%-- Includes for Scenes | contained in /files/mscp_sites/www/sp/ipp/7/14480/scenes/ folder --%>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/scenes/scene-1.jsp" %>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/scenes/scene-2.jsp" %>
        </div>

    <!-- ISI Panel Option 2: Bottom ISI
        The ISI has to states, Collapsed or Expanded. To activate the expanded one by default you can just add the class "is-expanded".
        The ISI have different configurations:
        1. ISI always takes up x% of the page: You can set that initial state in the instance css by adding a height to the "isi" class.
        2. When user first arrives, ISI height takes up x% of the page and after X seconds, ISI height shrinks to y%: You can set both states x% and y% in the instance level: 
            . Initial state: "isi" class
            . Final state: "is-final-state" class
            . Time: The "data-final-state-time" attribute which must be added to ISI div (id=isi). 
              For example, change the ISI panel's position after 5 seconds: data-final-state-time="5".
        3. When user first arrives, ISI height takes up x% of the page and on scroll or touch ISI height shrinks to y%: To enable this same feature on scroll/touch, all you need to do is set that data attribute to "0": data-final-state-time="0", this will change the ISI to the final position as soon as the user touches the screen or scrolls.
        4. ISI is expanded upon arrival and after X seconds, or if the user clicks the CTA, the ISI height shrinks to y%: To enable the roadblock, you can add the "is-expanded" class to the ISI div (id="isi"), something like: class="isi is-expanded". You can add the "data-final-state-time" attribute to set the time.
        5. ISI is expanded upon arrival and the user must click an “Accept” button/link: To enable this feature, you can add the "data-accept" attribute to the "isiArea" div. Within that data attribute you can specify the link/button text: data-accept="Accept"-->
        <div id="isi" class="isi" data-final-state-time="5">
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/components/isi.jsp" %>
        </div>

    <%-- Scripts --%>
        <script type="text/javascript" src="http://code.jquery.com/jquery-1.10.1.js"></script>
        <script src="http://crypto-js.googlecode.com/svn/tags/3.0.2/build/rollups/md5.js"></script>
        <script src="http://<medscape:domain type="imageServer"/>/pi/scripts/ba2/core.js"></script>
        <script src="http://<medscape:domain type="imageServer"/>/pi/scripts/ba2/tracking.js"></script>
        <script src="http://<medscape:domain type="imageServer"/>/pi/scripts/ba2/qna.bundle.js"></script>
        <script src="http://<medscape:domain type="imageServer"/>/pi/scripts/features/giftmanager/gm_ba2.js" type="text/javascript"></script>

        <script type="text/javascript">
            // Initial Events
            brandAdvance2.init();
        </script>

    <%-- Footer --%>
        <%@ include file="/files/common/footer/footer-blank-promo.jsp" %>

    </body>
</html>