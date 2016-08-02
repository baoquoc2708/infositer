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

        <title>Brand Advance 2.0 | Sprint 2</title>
        <%--@ page isELIgnored="false" --%>
        <%@ taglib uri="/WEB-INF/tld/prof-customtags.tld" prefix="medscape" %>
        <%--<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> --%>
        <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/files/common/useragent/list.jsp" %>
        <%-- <%@ taglib uri="/WEB-INF/tld/ipp.tld" prefix="ipp" %> --%>
        <%@ taglib uri="/WEB-INF/tld/c.tld" prefix="c" %>

        <c:set var="seriesId" value="7" />
        <c:set var="activityId" value="14481" />
        <c:set var="tacticId" value="11161" />
        <c:set var="sfNum" value="154922_1" />
        <c:set var="subTitle" value="Information From Industry" />

        <meta data-cp='{"tacticId":"<c:out value="${tacticId}" />", "activityId": "<c:out value="${activityId}" />", "parId":"<ipp:sessionVar key='par_id' />"}' />
        <meta name="metaref" content="<%=request.getHeader("referer")%>">

        <%-- CSS START--%>
            <link rel="stylesheet" href="http://<medscape:domain type="imageServer"/>/medcss/features/ba2/style.css">

            <%-- APP CSS (When if we have one)
            <medscape:includeif userAgent='<%=li1 + ",ipad"%>'>
                <medscape:includeif isApp="Y">

                </medscape:includeif>
            </medscape:includeif> --%>
        <%-- CSS END--%>

        <%-- GLOBAL JS START--%>
            <%-- For Global Scripts which must execute before content, all other scripts at the end of the file --%>
        <%--GLOBAL JS END--%>

    </head>
    <body>

        <%-- Sticky Header at top of page --%>
        <div id="header" class="header">

            <%-- Generic Medscape Promo Header including medscape links and disclaimer --%>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/components/headers/chrome-header.jsp" %>

            <%-- Brand Header including logo and information links --%>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/components/headers/brand-header.jsp" %>

            <%-- Progress Bar Component --%>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/components/progress-bar.jsp" %>

            <!-- ISI Panel -->
            <div id="isi" class="isi">
                <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/components/isi.jsp" %>
            </div>

        </div>



        <div class='scroll-indicator-main'><span class="scroll-text-main">Scroll</span></div>



        <div id="block1" class="block">
            <div class='scroll-indicator'><span class="scroll-text">Block Scroll</span></div>

            <%-- Includes for Scenes | contained in /scenes/ folder --%>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/scenes/scene-1.jsp" %>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/scenes/scene-2.jsp" %>
        </div>



        <div id="block2" class="block">

            <%-- Includes for Scenes | contained in /scenes/ folder --%>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/scenes/scene-3.jsp" %>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/scenes/scene-4.jsp" %>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/scenes/scene-5.jsp" %>
        </div>



        <div id="block3" class="block">
            <div class='scroll-indicator'><span class="scroll-text">Block Scroll</span></div>

            <%-- Includes for Scenes | contained in /scenes/ folder --%>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/scenes/scene-6.jsp" %>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/scenes/scene-7.jsp" %>
            <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/scenes/scene-8.jsp" %>
        </div>



        <%-- Scripts --%>
        <script type="text/javascript" src="http://code.jquery.com/jquery-1.10.1.js"></script>
        <script src="http://<medscape:domain type="imageServer"/>/pi/scripts/ba2/core.js"></script>
        <script type="text/javascript" src="http://<medscape:domain type="imageServer"/>/pi/scripts/ba2/qna.bundle.js"></script>
        <script type="text/javascript">
            // Initial Events
            brandAdvance2.init();
        </script>
        <%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/files/common/footer/footer-blank-promo.jsp" %>

    </body>
</html>
