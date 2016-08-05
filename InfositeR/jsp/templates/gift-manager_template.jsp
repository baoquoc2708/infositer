<%-- This file should be used as is. The only customizable area would be the "gm-info-layer" div where you can edit the messages for the user --%>
<div class="gift-manager-container">

	<div id="gm-info-layer" class="gift-manager-header">
		<div id="thank-you">Thank You.</div>
		<div id="service-error">The Gift Manager service is currently unavailable.</div>
		<div id="gm-info-msg"> Please confirm your information:</div>
		<div id="gm-error-msg">There are errors: Please see fields in red below.</div>
    </div>


	<div id="giftManagerElm" class="gift-manager-body">

		<div id="formInfo">
	    	<div id="emailInfo">
	    		<div class="input-group text_field_email">
	    		</div>

	    		<div class="input-group checkbox_field_1">
	    		</div>
	    	</div>
	    	<div class="input-group text-field-office1"></div>
	    	<div class="input-group text-field-office2"></div>
	    	<div class="input-group text-field-officecity"></div>
	    	<div class="input-group officestate_field"></div>
	    	<div class="input-group office-zip-field"></div>
		</div>

		<form method="post" action="/activity/gmservice/processorder" id="orderForm">

				<input id="activityHash"  type="hidden" value="" name="gm.program" />
			    <input id="packageHash"  type="hidden" value="" name="gm.package" />

				<div id='Giftlist'>

				</div>

				<div id="customGroups">

			    </div>

				<input type="hidden" value="" name="gm.tokenId" id="gm_tokenId" />
				<input type="submit" id="submit_order_button" value="Continue" />
	
				<div id="hiddenInfo">
					<div id='hiddenInfo_DCs'></div>
					<div id='hiddenInfo_Groups'></div>
				</div>
		</form>

	</div>
</div>