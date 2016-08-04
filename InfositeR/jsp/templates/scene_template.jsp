<%-- The scene must have an ID and follow the same structure as block: The scene ID should be "scene[NUMBER]". 
	For example: scene1, scene2, scene3 
    Finally, the class "scene" is also required. --%>
<div id="scene1" class="scene">
	<div class="container"><%-- The container must be specified and can include different types of content (we recommend to have one container by scene): --%>

		<%-- 1. Regular content --%>
			<h2>Choose Proven Efficacy in vivamus nulla</h2>

			<h3>SALUTRIB provides proven control in curabitur et felis <span class="footnote-ref">1,2</span></h3>

			<h4 class="chart-title">Efficacy Profile at curabitur et Felis</h4>
			<img class="svg-chart" src="http://<medscape:domain type="imageServer"/>/pi/sp/ipp/7/14480/charts/chart-one.svg" alt="">

			<h3>Study Designs</h3>
			<ul>
				<li>The efficacy of SALUTRIB for the treatment of vivamus nulla was examined in 2 clinical trials</li>
			</ul>

			<%-- EXPANDABLE ELEMENT --%>
			<div class="scene-refs js-expandable">
			    <a class="open-refs js-expandable-button" data-toggle="scene-refs" href="#" data-idtracking="ref1" data-scene="1">
				    <div class="js-expandable-button-collapsed">
				    	<p class="circle-icon">+</p>
				    	<p>See References</p>
				    </div>
				    <div class="js-expandable-button-expanded">
				    	<p class="circle-icon">+</p>
				    	<p>Hide References</p>
				    </div>
			    </a>

				<div class="js-expandable-content">
			    	<ol>
			    		<li class="ref">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore Dolore magna aliqua. 2014;4:e20</li>

			    		<li class="ref">Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde 3. omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore Dolore magna aliqua  2014;4:e20</li>
			    	</ol>
				</div>
		    </div>

		<%-- 2. POLLING: To display this module, you need to insert the data attribute "data-qnaFormId" which value is the questionaire ID / page ID.
			The default result after the user submits the answer will be a chart with the answers. This result can customized to display instead a "Thank you" message. To do so, you need to add this data-attribute: data-qna-message='' and insert the new content into the "qna-message" div.--%>
			<h2>Polling Question</h2>
			<div data-qnaFormId="35923/3" class='qna-container'></div> <!-- data-qna-message='' -->
			<div id="qna-message" class="is-invisible">Thank you!</div>

		<%-- 3. Gift Manager: To enable the GM you can just include its correspondent JSP under /components --%>
			<h2>Gift Manager</h2>
        	<h3>Get valuable SALUTRIB<sup>&reg;</sup> coupons for your patients.</h3>
        	<%-- In this section you can display the user's full name --%>
        	<p><%=user.getDisplayName()%></p>
        	<%-- Then you insert the Gift Manager's component --%>
			<%@ include file="/files/mscp_sites/www/sp/ipp/7/14480/components/gift-manager.jsp" %>

		<%-- 4. Video: [PENDING] --%>
    </div>
</div>