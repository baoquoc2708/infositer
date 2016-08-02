
            <%-- This is the header bar for ISI panel, these classes MUST be respected.
            	The "data-autoscroll" attribute is used to enable the autoscroll within the ISI, if you don't add this data-attribute then the auto-scroll feature won't be active. The value passed indicates the speed, which is measured in seconds, the lower the faster.
            	The data-idtracking attribute is used to track the ISI when expanded or collapsed. --%>
            <div class="isi-header js-isi-toggle" data-autoscroll="30" data-idtracking="">
                <div class="container">
                    <p class="isi-title">Important Safety Information (ISI)</p>
                    <%-- The following div, "isi-expand", it's on charge of expanding/collapsing the ISI.
                    	If you would like to replace the Expande/Collapse by buttons or images you should do it inside this div. --%>
                    <div class="isi-expand">
                        <p class="isi-header-text-collapsed">Expand</p>
                        <p class="isi-header-text-expanded">Collapse</p>
                    </div>
                </div>
            </div>

            <%-- Content Area for ISI Panel --%>
            <div id="isiArea" class="isi-content">
                <div class="container">
                <%-- If you need to display the ISI expanded (road block) and force the user to accept first, you must add this data-attribute:  data-accept="Accept".
                The value you specify in that data attribute is what will be displayed instead of the default one: "Collapse"
                If a jump link doesn't target a scene but content within a scene, we still need to track that scene. In order to do so you will need to indicate that scene for us, that is why we created a new data attribute "data-jump-scene='2'" where you only specify the scene number.--%>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. <a href="#scene2" data-jump-scene="2">JUMP TO SCENE 2</a> Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. <a href="http://www.medscape.com/sp/ipp/7/15352/content/isi" target="_blank" data-idtracking="medscapeLink1">INTERNAL LINK</a></p>
                </div>
            </div>