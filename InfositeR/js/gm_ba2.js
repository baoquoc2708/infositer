/* Created 10/19/15 by MN - AP */
// DEPENDENCIES: jQuery.
// This library is used on Brand Advance 2.0 for Gift Manager Functionality
(function () {
    if($('.gift-manager-container').length === 0){
        return;
    }
    var gmObj = $('.gift-manager-container').data();
    if(typeof gmObj.autoselectgift != 'undefined'){
        window.packageId = gmObj.packageid;
        window.promoActivityId = gmObj.promoactivityid;
        window.tokenId = gmObj.tokenid;
        window.autoSelectGift = gmObj.autoselectgift;
        window.defaultAdd = gmObj.defaultadd;
        window.emailNoProfile = gmObj.emailnoprofile;
        window.formHide = gmObj.formhide;
        window.onlyUS = gmObj.onlyus;
    }
    var officeAddObj = {}, altAddObj = {},
        emailAddObj = {}, _domain = "",
        _host = '', gmURL = '',
        countryList = {
                        "##NULL##":"Select A Country",
                        AF: "Afghanistan",
                        AL: "Albania",
                        DZ: "Algeria",
                        AS: "American Samoa",
                        AD: "Andorra",
                        AO: "Angola",
                        AI: "Anguilla",
                        AQ: "Antarctica",
                        AG: "Antigua and Barbuda",
                        AR: "Argentina",
                        AM: "Armenia",
                        AW: "Aruba",
                        AU: "Australia",
                        AT: "Austria",
                        AZ: "Azerbaijan",
                        BS: "Bahamas",
                        BH: "Bahrain",
                        BD: "Bangladesh",
                        BB: "Barbados",
                        BY: "Belarus",
                        BE: "Belgium",
                        BZ: "Belize",
                        BJ: "Benin",
                        BM: "Bermuda",
                        BT: "Bhutan",
                        BO: "Bolivia",
                        BA: "Bosnia and Herzegovina",
                        BW: "Botswana",
                        BV: "Bouvet Island",
                        BR: "Brazil",
                        IO: "British Indian Ocean Territory",
                        BN: "Brunei Darussalam",
                        BG: "Bulgaria",
                        BF: "Burkina Faso",
                        BI: "Burundi",
                        KH: "Cambodia",
                        CM: "Cameroon",
                        CA: "Canada",
                        CV: "Cape Verde",
                        KY: "Cayman Islands",
                        CF: "Central African Republic",
                        TD: "Chad",
                        CL: "Chile",
                        CN: "China",
                        CX: "Christmas Island",
                        CC: "Cocos (Keeling) Islands",
                        CO: "Colombia",
                        KM: "Comoros",
                        CG: "Congo",
                        CD: "Congo, the Democratic Republic of the",
                        CK: "Cook Islands",
                        CR: "Costa Rica",
                        CI: "Cote D'Ivoire",
                        HR: "Croatia",
                        CU: "Cuba",
                        CY: "Cyprus",
                        CZ: "Czech Republic",
                        DK: "Denmark",
                        DJ: "Djibouti",
                        DM: "Dominica",
                        DO: "Dominican Republic",
                        EC: "Ecuador",
                        EG: "Egypt",
                        SV: "El Salvador",
                        GQ: "Equatorial Guinea",
                        ER: "Eritrea",
                        EE: "Estonia",
                        ET: "Ethiopia",
                        FK: "Falkland Islands (Malvinas)",
                        FO: "Faroe Islands",
                        FJ: "Fiji",
                        FI: "Finland",
                        FR: "France",
                        GF: "French Guiana",
                        PF: "French Polynesia",
                        TF: "French Southern Territories",
                        GA: "Gabon",
                        GM: "Gambia",
                        GE: "Georgia",
                        DE: "Germany",
                        GH: "Ghana",
                        GI: "Gibraltar",
                        GR: "Greece",
                        GL: "Greenland",
                        GD: "Grenada",
                        GP: "Guadeloupe",
                        GU: "Guam",
                        GT: "Guatemala",
                        GN: "Guinea",
                        GW: "Guinea-Bissau",
                        GY: "Guyana",
                        HT: "Haiti",
                        HM: "Heard Island and Mcdonald Islands",
                        VA: "Holy See (Vatican City State)",
                        HN: "Honduras",
                        HK: "Hong Kong",
                        HU: "Hungary",
                        IS: "Iceland",
                        IN: "India",
                        ID: "Indonesia",
                        IR: "Iran, Islamic Republic of",
                        IQ: "Iraq",
                        IE: "Ireland",
                        IL: "Israel",
                        IT: "Italy",
                        JM: "Jamaica",
                        JP: "Japan",
                        JO: "Jordan",
                        KZ: "Kazakhstan",
                        KE: "Kenya",
                        KI: "Kiribati",
                        KP: "Korea, Democratic People's Republic of",
                        KR: "Korea, Republic of",
                        KW: "Kuwait",
                        KG: "Kyrgyzstan",
                        LA: "Lao People's Democratic Republic",
                        LV: "Latvia",
                        LB: "Lebanon",
                        LS: "Lesotho",
                        LR: "Liberia",
                        LY: "Libyan Arab Jamahiriya",
                        LI: "Liechtenstein",
                        LT: "Lithuania",
                        LU: "Luxembourg",
                        MO: "Macao",
                        MK: "Macedonia, the Former Yugoslav Republic of",
                        MG: "Madagascar",
                        MW: "Malawi",
                        MY: "Malaysia",
                        MV: "Maldives",
                        ML: "Mali",
                        MT: "Malta",
                        MH: "Marshall Islands",
                        MQ: "Martinique",
                        MR: "Mauritania",
                        MU: "Mauritius",
                        YT: "Mayotte",
                        MX: "Mexico",
                        FM: "Micronesia, Federated States of",
                        MD: "Moldova, Republic of",
                        MC: "Monaco",
                        MN: "Mongolia",
                        MS: "Montserrat",
                        MA: "Morocco",
                        MZ: "Mozambique",
                        MM: "Myanmar",
                        NA: "Namibia",
                        NR: "Nauru",
                        NP: "Nepal",
                        NL: "Netherlands",
                        AN: "Netherlands Antilles",
                        NC: "New Caledonia",
                        NZ: "New Zealand",
                        NI: "Nicaragua",
                        NE: "Niger",
                        NG: "Nigeria",
                        NU: "Niue",
                        NF: "Norfolk Island",
                        MP: "Northern Mariana Islands",
                        NO: "Norway",
                        OM: "Oman",
                        PK: "Pakistan",
                        PW: "Palau",
                        PS: "Palestinian Territory, Occupied",
                        PA: "Panama",
                        PG: "Papua New Guinea",
                        PY: "Paraguay",
                        PE: "Peru",
                        PH: "Philippines",
                        PN: "Pitcairn",
                        PL: "Poland",
                        PT: "Portugal",
                        PR: "Puerto Rico",
                        QA: "Qatar",
                        RE: "Reunion",
                        RO: "Romania",
                        RU: "Russian Federation",
                        RW: "Rwanda",
                        SH: "Saint Helena",
                        KN: "Saint Kitts and Nevis",
                        LC: "Saint Lucia",
                        PM: "Saint Pierre and Miquelon",
                        VC: "Saint Vincent and the Grenadines",
                        WS: "Samoa",
                        SM: "San Marino",
                        ST: "Sao Tome and Principe",
                        SA: "Saudi Arabia",
                        SN: "Senegal",
                        CS: "Serbia and Montenegro",
                        SC: "Seychelles",
                        SL: "Sierra Leone",
                        SG: "Singapore",
                        SK: "Slovakia",
                        SI: "Slovenia",
                        SB: "Solomon Islands",
                        SO: "Somalia",
                        ZA: "South Africa",
                        GS: "South Georgia and the South Sandwich Islands",
                        ES: "Spain",
                        LK: "Sri Lanka",
                        SD: "Sudan",
                        SR: "Suriname",
                        SJ: "Svalbard and Jan Mayen",
                        SZ: "Swaziland",
                        SE: "Sweden",
                        CH: "Switzerland",
                        SY: "Syrian Arab Republic",
                        TW: "Taiwan, Province of China",
                        TJ: "Tajikistan",
                        TZ: "Tanzania, United Republic of",
                        TH: "Thailand",
                        TL: "Timor-Leste",
                        TG: "Togo",
                        TK: "Tokelau",
                        TO: "Tonga",
                        TT: "Trinidad and Tobago",
                        TN: "Tunisia",
                        TR: "Turkey",
                        TM: "Turkmenistan",
                        TC: "Turks and Caicos Islands",
                        TV: "Tuvalu",
                        UG: "Uganda",
                        UA: "Ukraine",
                        AE: "United Arab Emirates",
                        GB: "United Kingdom",
                        US: "United States",
                        UM: "United States Minor Outlying Islands",
                        UY: "Uruguay",
                        UZ: "Uzbekistan",
                        VU: "Vanuatu",
                        VE: "Venezuela",
                        VN: "Viet Nam",
                        VG: "Virgin Islands, British",
                        VI: "Virgin Islands, U.S.",
                        WF: "Wallis and Futuna",
                        EH: "Western Sahara",
                        YE: "Yemen",
                        ZM: "Zambia",
                        ZW: "Zimbabwe"
                    },
        stateList = {
                        "##NULL##":"Select A State",
                        AL: "Alabama",
                        AK: "Alaska",
                        AZ: "Arizona",
                        AR: "Arkansas",
                        CA: "California",
                        CO: "Colorado",
                        CT: "Connecticut",
                        DE: "Delaware",
                        DC: "District Of Columbia",
                        FL: "Florida",
                        GA: "Georgia",
                        HI: "Hawaii",
                        ID: "Idaho",
                        IL: "Illinois",
                        IN: "Indiana",
                        IA: "Iowa",
                        KS: "Kansas",
                        KY: "Kentucky",
                        LA: "Louisiana",
                        ME: "Maine",
                        MD: "Maryland",
                        MA: "Massachusetts",
                        MI: "Michigan",
                        MN: "Minnesota",
                        MS: "Mississippi",
                        MO: "Missouri",
                        MT: "Montana",
                        NE: "Nebraska",
                        NV: "Nevada",
                        NH: "New Hampshire",
                        NJ: "New Jersey",
                        NM: "New Mexico",
                        NY: "New York",
                        NC: "North Carolina",
                        ND: "North Dakota",
                        OH: "Ohio",
                        OK: "Oklahoma",
                        OR: "Oregon",
                        PA: "Pennsylvania",
                        RI: "Rhode Island",
                        SC: "South Carolina",
                        SD: "South Dakota",
                        TN: "Tennessee",
                        TX: "Texas",
                        UT: "Utah",
                        VT: "Vermont",
                        VA: "Virginia",
                        WA: "Washington",
                        WV: "West Virginia",
                        WI: "Wisconsin",
                        WY: "Wyoming"
                    },
        autoSelectGiftFlg = autoSelectGift,
        emailUpdateText = 'Please check to update the email on profile.';
        var collectionTypes = [];
                var itemGroups = {};
                var itemGroupsArr = [];

    if (window.location.host.split('.').length > 3){
        _domain = window.location.host.split('.')[1] + ".";
        _host = window.location.host.split('.')[0] + ".";
    }
    if(_host=='www.'){
        gmURL = 'medscape.com/gmservice/getitems?packageId=';

    } else if(_host === 'wp.'){
        gmURL = 'medscape.com/activity/gmservice/getitems?packageId=';
    }

    $(document).ready(function() {
        
        $('#service-error').hide();
        $('#giftManagerElm').hide();
        $('#gm-info-layer').children().hide();
        $('#thank-you').hide();
        $('#giftManagerElm').show();
        $('#gm-main-element').hide();
        $('#orderForm').children().hide();
        $('#Giftlist').show();
        if ($('#giftManagerElm').length > 0) {
            loadGmForm();
        }

        if(typeof formHide != 'undefined'){
            if(formHide){
                $('.input-group').addClass('gmHide');
            }
        }
        $('[data-gmHide]').each(function(index, el) {
            $(this).addClass('gmHide');
        });

        $('#hiddenInfo').hide();

        if (window.matchMedia("(max-width: 800px)").matches){
            $('.gift-manager-container input').on('focus', function() {
                this.scrollIntoView();
            });
        }

        $("#orderForm").on('submit', function(evn) {
            evn.preventDefault(); // avoid to execute the actual submit of the form.
            if($("#Giftlist input[type=radio]").length > 0){
                if($("#Giftlist input[type=radio]:checked").length === 1){
                    if(autoSelectGiftFlg){
                        gmFormSubmitFn();
                    } else {
                        gmFormCreateFn();
                        autoSelectGiftFlg = true;
                    }
                } else {
                    alert('Please select one option for Coupon Offer');
                }
            } else {
                if(autoSelectGiftFlg){
                    gmFormSubmitFn();
                } else {
                    gmFormCreateFn();
                    autoSelectGiftFlg = true;
                }
            }
        });
    });

    function loadGmForm () {
        var subTokenId = tokenId.replace('%3D%3D', ''),
            packageIdVal, subpackageIdVal,
            promoActivityVal, subpromoActivityVal,
            pageHashVal;
        $("#gm_tokenId").val(decodeURIComponent(subTokenId));
        if (typeof packageId !== 'undefined') {
            packageIdVal = packageId;
            subpackageIdVal = decodeURIComponent(packageIdVal.replace('%3D%3D', ''));
        }
        if (typeof promoActivityId !== 'undefined') {
            promoActivityVal = promoActivityId;
            subpromoActivityVal = decodeURIComponent(promoActivityVal.replace('%3D%3D', ''));
        }
        if (typeof packageId !== 'undefined' && typeof promoActivityId !== 'undefined') {
            pageHashVal = subpromoActivityVal + '_' + subpackageIdVal;
        }
        
        $.ajax({
            url: 'http://'+ _host + _domain + gmURL + packageIdVal + '&promoActivityId=' + promoActivityVal + '&tokenId=' + tokenId + '&service=1&testOrder=0',
            //url: 'http://localhost:8080/products/brandadvance/json/gift_manager_activia.json',
            dataType: 'json',
            contentType: 'application/json',
            type: 'GET',
            success: function(json) {
                $('#gm-info-layer').show();
                $('#orderForm').show();
                $('#activityHash').attr('name', $('#activityHash').attr('name') + pageHashVal);
                $('#activityHash').attr('value', subpromoActivityVal);
                $('#packageHash').attr('name', $('#packageHash').attr('name') + pageHashVal);
                $('#packageHash').attr('value', subpackageIdVal);
                $(json.giftItems).each(function() {
                    var giftImg = '', itemText = '';
                    if (this.imgURL !== null) {
                        if (this.imgURL.indexOf("img") !== -1 || this.imgURL.indexOf("images") !== -1) {
                            giftImg = '<img border="0" class="honorimg" alt="" src="' + this.imgURL + '" />';
                        }
                    }
                    if (this.itemDesc !== null) {
                        itemText = this.itemDesc;
                    }

                    if (this.category.id === 1 || this.category.id === 6) {
                        $('#Giftlist').append('<div class="giftItemRow"><input type="radio" value="' + this.itemIdHash + '" name="gm.giftitem' + pageHashVal + '" /><h4>' + this.itemName + '</h4><p>' + itemText + '</p><p>' + giftImg + '</p><input type="hidden" value="' + this.options[0].idHash + '" name="gm.option' + this.itemIdHash + '_' + pageHashVal + '" id="gm.option' + this.itemIdHash + '_' + pageHashVal + '" />');
                    } else {
                        $('#Giftlist').append('<div class="giftItemRow"><input type="checkbox" value="' + this.itemIdHash + '" name="gm.item' + pageHashVal + '" /><h4>' + this.itemName + '</h4><p>' + itemText + '</p><p>' + giftImg + '</p><input type="hidden" value="' + this.options[0].idHash + '" name="gm.option' + this.itemIdHash + '_' + pageHashVal + '" id="gm.option' + this.itemIdHash + '_' + pageHashVal + '" />');
                    }
                    var giftItemVal = this.itemIdHash;

                    $(this.fulfillmentDetails.groups).each(function() {

                        if (jQuery.inArray(this.id, collectionTypes) == -1) {
                            collectionTypes.push(this.id);
                            if (this.groups.length > 0) {
                                $(this.groups).each(function() {

                                    $(this.dataCollectionTypes).each(function() {
                                        var userDataVal;
                                        switch (this.id) {
                                            case 12:
                                                userDataVal = userDataPrePop(json.giftItems[0].captureFields.emailAddress);
                                                emailAddObj.email = userDataVal;
                                                $('#subGroupTitle-emailAdd').html(userDataVal);
                                                break;
                                            case 29:
                                                userDataVal = 1; //save email to profile flag
                                                break;
                                            case 13:
                                                userDataVal = userDataPrePop(json.giftItems[0].captureFields.contactInfo[0].street1);
                                                officeAddObj.str1 = userDataVal;
                                                $('#subGroupTitle-officeSt1').html(userDataVal);
                                                break;
                                            case 14:
                                                userDataVal = userDataPrePop(json.giftItems[0].captureFields.contactInfo[0].street2);
                                                officeAddObj.str2 = userDataVal;
                                                break;
                                            case 15:
                                                userDataVal = userDataPrePop(json.giftItems[0].captureFields.contactInfo[0].city);
                                                officeAddObj.city = userDataVal;
                                                break;
                                            case 16:
                                                userDataVal = userDataPrePop(json.giftItems[0].captureFields.contactInfo[0].stateAbbreviation);
                                                userDataVal = userDataVal.toUpperCase();
                                                officeAddObj.st = userDataVal;
                                                break;
                                            case 17:
                                                userDataVal = userDataPrePop(json.giftItems[0].captureFields.contactInfo[0].zipCode);
                                                officeAddObj.zip = userDataVal;
                                                break;
                                            case 35:
                                                userDataVal = userDataPrePop(json.giftItems[0].captureFields.contactInfo[0].countryAbbreviation);
                                                userDataVal = userDataVal.toUpperCase();
                                                officeAddObj.ct = userDataVal;
                                                break;
                                            case 18:
                                                userDataVal = userDataPrePop(json.giftItems[0].captureFields.contactInfo[1].street1);
                                                altAddObj.str1 = userDataVal;
                                                $('#subGroupTitle-altSt1').html(userDataVal);
                                                break;
                                            case 19:
                                                userDataVal = userDataPrePop(json.giftItems[0].captureFields.contactInfo[1].street2);
                                                altAddObj.str2 = userDataVal;
                                                break;
                                            case 20:
                                                userDataVal = userDataPrePop(json.giftItems[0].captureFields.contactInfo[1].city);
                                                altAddObj.city = userDataVal;
                                                break;
                                            case 21:
                                                userDataVal = userDataPrePop(json.giftItems[0].captureFields.contactInfo[1].stateAbbreviation);
                                                userDataVal = userDataVal.toUpperCase();
                                                altAddObj.st = userDataVal;
                                                break;
                                            case 22:
                                                userDataVal = userDataPrePop(json.giftItems[0].captureFields.contactInfo[1].zipCode);
                                                altAddObj.zip = userDataVal;
                                                break;
                                            case 36:
                                                userDataVal = userDataPrePop(json.giftItems[0].captureFields.contactInfo[1].countryAbbreviation);
                                                userDataVal = userDataVal.toUpperCase();
                                                altAddObj.ct = userDataVal;
                                                break;
                                        }
                                        if(this.id === 16 || this.id === 21){
                                            var stateField;
                                            if(onlyUS){
                                                var selectSt = $('<select class="gmInput" data-gm-name="' + this.name + '" id="gm_dcType_' + this.id + '" name="gm.dcType_' + this.id + '" value="' + userDataVal + '" />');
                                                for(var state in stateList) {
                                                    $('<option />', {value: state, text: stateList[state]}).appendTo(selectSt);
                                                }
                                                stateField = selectSt;
                                            } else {
                                                var inputSt = $('<input class="gmInput" data-gm-name="' + this.name + '" id="gm_dcType_' + this.id + '" name="gm.dcType_' + this.id + '" value="' + userDataVal + '" />');
                                                stateField = inputSt;
                                            }
                                            $('#hiddenInfo_DCs').append('<label   class="gmLabel" data-gm-name="' + this.name + '" for="gm_dcType_' + this.id + '" name="gm.dcType_' + this.id + '" value="' + userDataVal + '" >' + this.name + '</label>').append(stateField);
                                            var id1 = 'gm_dcType_' + this.id;

                                            document.getElementById(id1).value = userDataVal;

                                        } else if (this.id === 35 || this.id === 36){
                                            var selectCt = $('<select class="gmInput" data-gm-name="' + this.name + '" id="gm_dcType_' + this.id + '" name="gm.dcType_' + this.id + '" value="' + userDataVal + '" />');
                                            for(var country in countryList) {
                                                $('<option />', {value: country, text: countryList[country]}).appendTo(selectCt);
                                            }
                                            $('#hiddenInfo_DCs').append('<label   class="gmLabel" data-gm-name="' + this.name + '" for="gm_dcType_' + this.id + '" name="gm.dcType_' + this.id + '" value="' + userDataVal + '" >' + this.name + '</label>').append(selectCt);
                                            var id2 = 'gm_dcType_' + this.id;
                                            document.getElementById(id2).value = userDataVal;

                                        } else {
                                            $('#hiddenInfo_DCs').append('<label   class="gmLabel" data-gm-name="' + this.name + '" for="gm_dcType_' + this.id + '" name="gm.dcType_' + this.id + '" value="' + userDataVal + '" >' + this.name + '</label><input   class="gmInput" data-gm-name="' + this.name + '" id="gm_dcType_' + this.id + '" name="gm.dcType_' + this.id + '" value="' + userDataVal + '" /><br>');
                                        }
                                    });
                                });
                            }
                            if (this.dataCollectionTypes.length > 0) {
                                $(this.dataCollectionTypes).each(function() {
                                    var userDataVal;
                                    switch (this.id) {
                                        case 23:
                                            userDataVal = userDataPrePop(json.giftItems[0].captureFields.contactInfo[0].phoneNumber);
                                            if (userDataVal === '') {
                                                $('#phone_field_14').attr('value', 'XXX-XXX-XXXX');
                                            } else {
                                                $('#phone_field_14').attr('value', userDataVal);
                                            }
                                            break;
                                        case 24:
                                            userDataVal = userDataPrePop(json.giftItems[0].captureFields.contactInfo[0].faxNumber);
                                            if (userDataVal === '') {
                                                $('#fax_field_15').attr('value', 'XXX-XXX-XXXX');
                                            } else {
                                                $('#fax_field_15').attr('value', userDataVal);
                                            }
                                            break;
                                        case 25:
                                            userDataVal = userDataPrePop(json.giftItems[0].captureFields.sln);
                                            $('#sln_field_16').attr('value', userDataVal);
                                            break;
                                        case 26:
                                            userDataVal = userDataPrePop(json.giftItems[0].captureFields.licenseState);
                                            if (userDataVal !== '') {
                                                $('#LicensingState option[value=' + userDataVal + ']').prop('selected', true);
                                            }
                                            break;
                                        case 27:
                                            userDataVal = userDataPrePop(json.giftItems[0].captureFields.dea);
                                            $('#dea_field_18').attr('value', userDataVal);
                                            break;
                                        case 28:
                                            userDataVal = userDataPrePop(json.giftItems[0].captureFields.dob);
                                            var dobArr = userDataVal.split("-");
                                            userDataVal = dobArr[1] + "." + dobArr[2] + "." + dobArr[0];
                                            if (userDataVal !== '') {
                                                $('#DOBMonth option[value=' + dobArr[1] + ']').prop('selected', true);
                                                $('#regday_input_19').attr('value', dobArr[2]);
                                                $('#regyear_input_19').attr('value', dobArr[0]);
                                            }
                                            break;
                                        case 30:
                                            userDataVal = "##NULL##";
                                            break;
                                        case 31:
                                            userDataVal = "##NULL##";
                                            break;
                                        case 32:
                                            userDataVal = "##NULL##";
                                            break;
                                        case 33:
                                            userDataVal = "##NULL##";
                                            break;
                                        case 34:
                                            userDataVal = "##NULL##";
                                            break;
                                    }
                                    $('#hiddenInfo_DCs').append('<input type="hidden" id="gm_dcType_' + this.id + '" name="gm.dcType_' + this.id + '" value="' + userDataVal + '" />');
                                });
                            }
                        }

                        if (!itemGroups.hasOwnProperty(giftItemVal)) {
                            itemGroupsArr = [];
                            itemGroups[giftItemVal] = itemGroupsArr;
                        }

                        if (this.groups.length > 0) {
                            $(this.groups).each(function() {
                                var groupId = this.id;
                                $(this.dataCollectionTypes).each(function() {
                                    if (jQuery.inArray(groupId, itemGroupsArr) == -1) {
                                        itemGroupsArr.push(groupId);
                                        itemGroups[giftItemVal] = itemGroupsArr;
                                    }
                                });
                            });
                        }
                        if (this.dataCollectionTypes.length > 0) {
                            var groupId = this.id;
                            $(this.dataCollectionTypes).each(function() {
                                if (jQuery.inArray(groupId, itemGroupsArr) == -1) {
                                    itemGroupsArr.push(groupId);
                                    itemGroups[giftItemVal] = itemGroupsArr;
                                }
                            });
                        }
                    });
                });

                $("#customGroups").append('<input type="radio" id="subGroupValue-3" name="groupValue-1" value="3">');
                $("#customGroups").append('<input type="radio" id="subGroupValue-4" name="groupValue-2" value="4">');
                if(autoSelectGiftFlg){
                    gmFormCreateFn();
                }
                $('#gm-info-msg').show();
                gm_global_popups('email');
                $('#submit_order_button').show();
                if(typeof brandAdvance2 == 'undefined'){
                    $('#cancel-button').show();
                }
            },
            error: function(data){
                $('#gm-info-layer').children().hide();
                $('#service-error').show();
                $('#giftManagerElm').hide();
            },
            complete: function(){
                /*=== Function for hiding ISI on focusing input ===*/
                if(typeof brandAdvance2 != 'undefined'){
                    brandAdvance2.inputIsiBind();
                }
            }
        });
    }

    function thankYouNotice(){
        $('#gm-info-layer').children().hide();
        $('#giftManagerElm').hide();
        $('#giftManagerElm').empty();
        $('#thank-you').show();
    }

    function userDataPrePop(userPass) {
        var CollectTypeVal;
        if (userPass === null) {
            CollectTypeVal = '';
        } else {
            CollectTypeVal = userPass;
        }
        return CollectTypeVal;
    }

    function gmFormCreateFn(){
        $("div#Giftlist").hide();
        if(autoSelectGift){
            $("div#Giftlist input").prop("checked", true);
        }
        $("#hiddenInfo_Groups").empty();
        $("div[id^='group-']").hide();
        $("div#Giftlist input:checked").each(function() {
            var giftTempVal = this.value;
            $(itemGroups[giftTempVal]).each(function(index) {
                $("#group-" + $(itemGroups[giftTempVal])[index]).show();
                if ($('#gm_group_' + $(itemGroups[giftTempVal])[index]).length === 0) {
                    $("#hiddenInfo_Groups").append('<input type="hidden" id="gm_group_' + $(itemGroups[giftTempVal])[index] + '" name="gm.group_' + $(itemGroups[giftTempVal])[index] + '" value="true">');
                }
            });
        });
        $('#customGroups').hide();
        $("#subGroupValue-3").prop("checked", true);
        $("#subGroupValue-4").prop("checked", true);
        if (defaultAdd == 1) {
            gm_global_popups('officeadd');
            $('#gm_group_5').remove();
            if ($('#gm_group_4').length === 0) {
                $("#hiddenInfo_Groups").append('<input type="hidden" id="gm_group_4" name="gm.group_4" value="true">');
            }
        } else if (defaultAdd == 2) {
            gm_global_popups('altadd');
            $('#gm_group_4').remove();
            if ($('#gm_group_5').length === 0) {
                $("#hiddenInfo_Groups").append('<input type="hidden" id="gm_group_5" name="gm.group_5" value="true">');
            }
        }
        if(onlyUS){
            $('.office-country-field').addClass('gmHide');
        } else {
            $('.officestate_field, .office-zip-field').addClass('gmHide');
        }
    }

    function gmFormSubmitFn(){
        if ($('#gm_group_3').length === 0) {
            $("#gm_dcType_12").remove();
            $("#gm_dcType_29").remove();
        }
        if ($('#gm_group_4').length === 0) {
            $("#gm_dcType_13").remove();
            $("#gm_dcType_14").remove();
            $("#gm_dcType_15").remove();
            $("#gm_dcType_16").remove();
            $("#gm_dcType_17").remove();
            $("#gm_dcType_35").remove();
        }
        if ($('#gm_group_5').length === 0) {
            $("#gm_dcType_18").remove();
            $("#gm_dcType_19").remove();
            $("#gm_dcType_20").remove();
            $("#gm_dcType_21").remove();
            $("#gm_dcType_22").remove();
            $("#gm_dcType_36").remove();
        }
        if ($('#gm_group_6').length === 0) {
            $("#gm_dcType_23").remove();
        }
        if ($('#gm_group_7').length === 0) {
            $("#gm_dcType_24").remove();
        }
        if ($('#gm_group_8').length === 0) {
            $("#gm_dcType_25").remove();
        }
        if ($('#gm_group_9').length === 0) {
            $("#gm_dcType_26").remove();
        }
        if ($('#gm_group_10').length === 0) {
            $("#gm_dcType_27").remove();
        }
        if ($('#gm_group_11').length === 0) {
            $("#gm_dcType_28").remove();
        }
        if ($('#gm_group_12').length === 0) {
            $("#gm_dcType_30").remove();
        }
        if ($('#gm_group_13').length === 0) {
            $("#gm_dcType_31").remove();
        }
        if ($('#gm_group_14').length === 0) {
            $("#gm_dcType_32").remove();
        }
        if ($('#gm_group_15').length === 0) {
            $("#gm_dcType_33").remove();
        }
        if ($('#gm_group_16').length === 0) {
            $("#gm_dcType_34").remove();
        }

        $("input[id^='gm_dcType_']").each(function() {
            var hideTempId = this.id;
            var hideTempVal = this.value;
            document.getElementById(hideTempId).value = hideTempVal;
        });

        var emailEntered = $('#text_field_email').val();
        $("#gm_dcType_12").val(emailEntered);
        if ($("#checkbox_field_1").is(':checked')) {
            $("#gm_dcType_29").val('1');
        } else {
            $("#gm_dcType_29").val('0');
        }

        if (defaultAdd === 1) {
            $("#gm_dcType_13").val($('#text_field_office1').val());
            $("#gm_dcType_14").val($('#text_field_office2').val());
            $("#gm_dcType_15").val($('#text_field_officecity').val());
            $("#gm_dcType_16").val($('#officestate_field').val());
            $("#gm_dcType_17").val($('#office_zip_field').val());
            $("#gm_dcType_35").val($('#office_countries').val());
        } else if (defaultAdd === 2) {
            $("#gm_dcType_18").val($('#text_field_alt1').val());
            $("#gm_dcType_19").val($('#text_field_alt2').val());
            $("#gm_dcType_20").val($('#text_field_altcity').val());
            $("#gm_dcType_21").val($('#altstate_field').val());
            $("#gm_dcType_22").val($('#alt_zip_field').val());
            $("#gm_dcType_36").val($('#alt_countries').val());
        }

        $('.input-group').removeClass('error');
        var url = $('#orderForm').attr('action'); // the script where you handle the form input.=
        if(_host=='www.'){
            url = '/gmservice/processorder';
        }
        $.ajax({
            type: "POST",
            url: url,
            data: $("#orderForm").serialize(),
            success: function(Postdata) {
                if (Postdata.success === false) {
                    var errorResult=[];
                    $.each(Postdata.errormsg, function(i, e) {
                        if ($.inArray(e, errorResult) == -1) errorResult.push(e);
                    });
                    $('#gm-info-msg').hide();
                    $('#gm-error-msg').show();
                    $('#formInfo input, #formInfo select').not('#text_field_office2').not('#text_field_alt2')
                        .each(function(index, el) {
                            var gmName = '';
                            gmName = gmName + $(this).data('gm-name');
                            for(i=0;i<errorResult.length;i++){
                                var errorName ='';
                                errorName = errorName + errorResult[i];
                                if(gmName.indexOf('Email')>-1 && errorName.indexOf('Email')>-1){
                                   $(this).parent().addClass('error');
                                } else if(gmName.indexOf('Line')>-1 && errorName.indexOf('Line')>-1){
                                   $(this).parent().addClass('error');
                                } else if(gmName.indexOf('City')>-1 && errorName.indexOf('City')>-1){
                                    $(this).parent().addClass('error');
                                } else if(gmName.indexOf('State')>-1 && errorName.indexOf('State')>-1){
                                   $(this).parent().addClass('error');
                                } else if(gmName.indexOf('Zip')>-1 && errorName.indexOf('Zip')>-1){
                                    $(this).parent().addClass('error');
                                } else if(gmName.indexOf('Country')>-1 && errorName.indexOf('Country')>-1){
                                    $(this).parent().addClass('error');
                                }
                            }
                        });
                } else if (Postdata.success === true) {
                    thankYouNotice();
                }
            },
            error: function(){
                $('#gm-info-layer').children().hide();
                $('#service-error').show();
                $('#giftManagerElm').hide();
            },
            complete: function(){
                if(typeof brandAdvance2 != 'undefined'){
                    if($('.scene').length && $('#header').length){
                        $('.gift-manager-container').closest('.scene')[0].scrollIntoView();
                        document.body.scrollTop -= $('#header').height();
                        document.documentElement.scrollTop -= $('#header').height();
                    }
                }
            }
        });
    }

    function gm_global_popups(popId) {
        if (popId == "email") {
            if ($('#emailInfo').length > 0) {
                $('[data-gm-name="Email Address"]').clone().appendTo('.text_field_email').removeAttr('id').removeAttr('type').removeAttr('style').attr('id', 'text_field_email');
                $('<input type="checkbox" id="checkbox_field_1" value="1" checked="checked" /><label id="prototype_checkbox_1" for="checkbox_field_1">' + emailUpdateText +' </label>').appendTo('.checkbox_field_1');
                if (emailNoProfile) {
                    $('#checkbox_field_1').prop('checked', false);
                    $("#gm_dcType_29").val('0');
                }
                $('.input-group').children('label').removeAttr('id');
            }
        } else if (popId == "officeadd") {
            if ($('#formInfo').length > 0) {
                $('[data-gm-name="Office Address Line 1"]').clone().appendTo('.text-field-office1').removeAttr('id').removeAttr('type').removeAttr('style').attr('id', 'text_field_office1');
                $('[data-gm-name="Office Address Line 2"]').clone().appendTo('.text-field-office2').removeAttr('id').removeAttr('type').removeAttr('style').attr('id', 'text_field_office2');
                $('[data-gm-name="Office City"]').clone().appendTo('.text-field-officecity').removeAttr('id').removeAttr('type').removeAttr('style').attr('id', 'text_field_officecity');
                $('[data-gm-name="Office State"]').clone().appendTo('.officestate_field').removeAttr('id').removeAttr('type').removeAttr('style').attr('id', 'officestate_field').val($('#gm_dcType_16').val());
                $('[data-gm-name="Office Zip Code"]').clone().appendTo('.office-zip-field').removeAttr('id').removeAttr('type').removeAttr('style').attr('id', 'office_zip_field');
                $('[data-gm-name="Office Country"]').clone().appendTo('.office-country-field').removeAttr('id').removeAttr('type').addClass('office_countries').removeAttr('style').attr('id', 'office_countries').val($('#gm_dcType_35').val());
                $('.input-group').children('label').removeAttr('id');
            }
        } else if (popId == "altadd") {
            if ($('#formInfo').length > 0) {
                $('[data-gm-name="Alternate Address Line 1"]').clone().appendTo('.text-field-office1').removeAttr('id').removeAttr('type').removeAttr('style').attr('id', 'text_field_alt1');
                $('[data-gm-name="Alternate Address Line 2"]').clone().appendTo('.text-field-office2').removeAttr('id').removeAttr('type').removeAttr('style').attr('id', 'text_field_alt2');
                $('[data-gm-name="Alternate City"]').clone().appendTo('.text-field-officecity').removeAttr('id').removeAttr('type').removeAttr('style').attr('id', 'text_field_altcity');
                $('[data-gm-name="Alternate State"]').clone().appendTo('.officestate_field').removeAttr('id').removeAttr('type').removeAttr('style').attr('id', 'altstate_field').val($('#gm_dcType_21').val());
                $('[data-gm-name="Alternate Zip Code"]').clone().appendTo('.office-zip-field').removeAttr('id').removeAttr('type').removeAttr('style').attr('id', 'alt_zip_field');
                $('[data-gm-name="Alternate Country"]').clone().appendTo('.office-country-field').removeAttr('id').removeAttr('type').addClass('alt_countries').removeAttr('style').attr('id', 'alt_countries').val($('#gm_dcType_36').val());
                $('.input-group').children('label').removeAttr('id');
            }
        }
    }
})();