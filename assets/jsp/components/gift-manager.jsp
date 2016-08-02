<div class="gift-manager-container" data-autoSelectGift="true" data-defaultAdd="1" data-onlyUS="false" 
		data-emailNoProfile="true" data-formHide="false"
		data-packageId="%2BqvxgVUX6sW63gat06lvdA%3D%3D"
		data-promoActivityId="GyGHJGRk1aYQZVihtEIw2Q%3D%3D"
		data-tokenId= "<gm:token packageId='698' expirationDate='06/30/2016'/>">

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
	    	<div class="input-group office-country-field"></div>
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