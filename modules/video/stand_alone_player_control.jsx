import React, { PropTypes } 	from 'react';
import $              			from 'jquery';
import cx                   	from 'classnames';
import _screenfull    			from 'screenfull';
import HasPrettyTime 			from '../mixins/has_pretty_time.js';


export default React.createClass({
	displayName: 'Player.Controls',
	propTypes: {
		playerId: PropTypes.string,
		iterator: PropTypes.number,
		controlVolume: PropTypes.number
	},
	mixins:[HasPrettyTime],
	componentDidMount() {
		this.volumeHover();
		this.fullscreenPlayer();
		this.onPlayPause();
		this.volumeFn();
		this.volumebarFn();
		this.progressDuration();
		this.progressClickFn();
		this.ProgressScrub();
		this.volumeScrub();
		this.ba2IsiVideoPause();
		this.setupFullScreenIdleDetection();
	},
	getInitialState() {
		return {
			fullscreenFlg:false,
			muteFlg:false,
			playButton: true,
			isMouseIdle: false,
			volumeLow: false,
			volumeMed: false,
			volumeHigh: true,
			volumeBar: false,
			onProgress: true,
			isVisible:false,
			volumeScrubFlg:false,
			progressScrubFlg:false
		}
	},
	setupFullScreenIdleDetection() {
		let self = this;
		this.idleTimeoutId = setTimeout(() => {
			this.setState({ isMouseIdle: true });
		}, 3000);
		$(document).off('mousemove'+'.idle'+self.props.iterator);
		$(document).on('mousemove'+'.idle'+self.props.iterator, () => {
			this.clearFullScreenIdleDetection();
			$(document).off('mousemove'+'.idle'+self.props.iterator);
			this.setupFullScreenIdleDetection();
		});
	},
	clearFullScreenIdleDetection() {
		let self = this;
		clearTimeout(this.idleTimeoutId);
		$(document).off('mousemove'+'.idle'+self.props.iterator);
		this.setState({ isMouseIdle: false });
	},
	fullscreenPlayer(){
		let $fsBtn = $(React.findDOMNode(this)).find('.fullscreen'),
			self = this;
		$(document).on(screenfull.raw.fullscreenchange, function() {
      		if(!screenfull.isFullscreen){
      			self.setState({ fullscreenFlg: false });
      		}
    	});
    	$fsBtn.on('click touch', function() {
    		if(!screenfull.isFullscreen){
    			videoPlayer[self.props.iterator].mediaApi._v.enterFullScreen();
    			self.setState({ fullscreenFlg: true });
         	} else {
         		videoPlayer[self.props.iterator].mediaApi._v.exitFullScreen();
         		self.setState({ fullscreenFlg: false });	
			}
    	});
	},
	volumeHover(){
		let $muteBtn = $(React.findDOMNode(this)).find('.button-mute'),
			$volumeWrap = $(React.findDOMNode(this)).find('.volume-wrap'),
			self = this;
		$muteBtn.hover(function() {
			/* Stuff to do when the mouse enters the element */
			self.setState({
				isVisible: true,
				volumeBar: true,
				onProgress: false
			});
		}, function() {
			/* Stuff to do when the mouse leaves the element */
		});
		$volumeWrap.hover(function() {
			/* Stuff to do when the mouse enters the element */
		}, function() {
			/* Stuff to do when the mouse leaves the element */
			self.setState({
				isVisible: false,
				volumeBar: false,
				onProgress: true
			})
		});
	},
	volumeFn(){
		let $muteBtn = $(React.findDOMNode(this)).find('.button-mute'),
			self = this;
		$muteBtn.on('click touch', function() {
			if(!self.state.muteFlg){
				videoPlayer[self.props.iterator].mediaApi.mute();
				self.setProps({ controlVolume: 0 });
				self.volumeState(self.props.controlVolume);
				$(React.findDOMNode(self)).find(".volume").css('height','0%');
				$(React.findDOMNode(self)).find(".not-volume").css('height','100%');
			} else {
				videoPlayer[self.props.iterator].mediaApi.unmute();
				let volume = videoPlayer[self.props.iterator].mediaApi.getVolume();
				self.setProps({ controlVolume: volume });
				self.setState({ muteFlg: false });
				$(React.findDOMNode(self)).find(".volume").css('height', volume*100+'%');
				$(React.findDOMNode(self)).find(".not-volume").css('height', ((1-volume)*100)+'%');
				self.volumeState(self.props.controlVolume);
			}
		});
	},
	volumebarFn(){
		let $volumeBar = $(React.findDOMNode(this)).find('.volume-inner'),
			self = this;
		$volumeBar.on('click', function(event) {
			let posHeight, pos;
				posHeight = $(this).offset().top + $(this).height();
			if(event.pageY >= posHeight){
				$(React.findDOMNode(self)).find(".volume").css('height','0%');
				$(React.findDOMNode(self)).find(".not-volume").css('height','100%');
				pos = 0;
			} else {
				pos = (posHeight - event.pageY)/$(this).height();
			}
			self.setProps({ controlVolume: pos });
			self.setState({ muteFlg: false });
			videoPlayer[self.props.iterator].mediaApi.setVolume(pos);
			$(React.findDOMNode(self)).find(".volume").css('height', pos*100+'%');
			$(React.findDOMNode(self)).find(".not-volume").css('height', ((1-pos)*100)+'%');
			self.volumeState(self.props.controlVolume);
		});
	},
	volumeState(volumeProp){
		if(volumeProp > 0 && volumeProp <= 0.33){
		    this.setState({ 
				volumeHigh: false,
				volumeLow: true,
				volumeMed: false 
			});
		} else if(volumeProp > 0.33 && volumeProp <= 0.66){
			this.setState({ 
				volumeHigh: false,
				volumeLow: false,
				volumeMed: true 
			});
		} else if(volumeProp > 0.66){
			this.setState({ 
				volumeHigh: true,
				volumeLow: false,
				volumeMed: false 
			});
		} else if (volumeProp === 0){
			this.setState({ 
				muteFlg: true,
				volumeHigh: false,
				volumeLow: false,
				volumeMed: false 
			});
		}
	},
	onPlayPause(){
		let self = this,
			$playBtn = $(React.findDOMNode(this)).find('.playpause');
		$(videoPlayer[self.props.iterator].mediaApi._v.mediaElement).on('pause', function() {
			self.setState({ playButton: true });
		});
		$(videoPlayer[self.props.iterator].mediaApi._v.mediaElement).on('play', function() {
			self.setState({ playButton: false })
		});
		$playBtn.on('click touch', function() {
			if(!self.state.playButton){
				self.setState({ playButton: false });
				videoPlayer[self.props.iterator].mediaApi._v.mediaElement.pause();	
			} else {
				self.setState({ playButton: true });
				videoPlayer[self.props.iterator].mediaApi._v.mediaElement.play();
			}
		});
	},
	progressDuration(){
		const dragProgress = $(React.findDOMNode(this)).find('.progress-drag').width(),
			totalProgress = $(React.findDOMNode(this)).find('.video-progress').width(),
			dragPercent = dragProgress * 100/totalProgress;
		let self = this,
			$progress = $(React.findDOMNode(this)).find('.video-progress');
		videoPlayer[self.props.iterator].mediaApi._v.mediaElement.addEventListener('timeupdate', function() {
			let value = videoPlayer[self.props.iterator].mediaApi._v.mediaElement.currentTime *(100 - dragPercent)/videoPlayer[self.props.iterator].mediaApi._v.mediaElement.duration;
			let notValue = 100 - value;
			$progress.find('.seekslider').css('width', value+'%');
			$progress.find('.not-value').css('width', notValue+'%');
			let duration = self.secondsToPrettyTime(videoPlayer[self.props.iterator].mediaApi._v.mediaElement.duration,2),
				current = self.secondsToPrettyTime(videoPlayer[self.props.iterator].mediaApi._v.mediaElement.currentTime,2);
			$(React.findDOMNode(self)).find('.curtimetext').text(current);
			$(React.findDOMNode(self)).find('.durtimetext').text(duration);
		});
	},
	progressClickFn(){
		let self = this,
			$progress = $(React.findDOMNode(this)).find('.video-progress');
		$progress.on('click tpuch', function(event) {
			let posLeft, pos;
      		posLeft = event.pageX - $(this).offset().left;
			if(posLeft >= $(this).width()){
				videoPlayer[self.props.iterator].mediaApi._v.mediaElement.currentTime = videoPlayer[self.props.iterator].mediaApi._v.mediaElement.duration;
			} else {
				pos = posLeft/$(this).width();
				videoPlayer[self.props.iterator].mediaApi._v.mediaElement.currentTime = pos * videoPlayer[self.props.iterator].mediaApi._v.mediaElement.duration;
			}
		});
	},
	killEvent(e) {
		e.stopPropagation();
  	},
  	onMouseMove(e) {
		const left = $(React.findDOMNode(this)).offset().left;
		let pos,
			posLeft = e.pageX - left
			self = this;
		if(posLeft >= $(React.findDOMNode(this)).width()){
			videoPlayer[self.props.iterator].mediaApi._v.mediaElement.currentTime = videoPlayer[self.props.iterator].mediaApi._v.mediaElement.duration;
		} else {
			pos = posLeft/$(React.findDOMNode(this)).width();
			videoPlayer[self.props.iterator].mediaApi._v.mediaElement.currentTime = pos * videoPlayer[self.props.iterator].mediaApi._v.mediaElement.duration;
		}	
	},
	onTouchMove(e) {
		e.preventDefault();
		const $this = $(React.findDOMNode(this)),
			touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		let posLeft = touch.pageX - $this.offset().left, pos, self = this;
		if(posLeft >= $this.width()){
			videoPlayer[self.props.iterator].mediaApi._v.mediaElement.currentTime = videoPlayer[self.props.iterator].mediaApi._v.mediaElement.duration;
		} else {
			pos1 = posLeft/$this.width();
			videoPlayer[self.props.iterator].mediaApi._v.mediaElement.currentTime = pos * videoPlayer[self.props.iterator].mediaApi._v.mediaElement.duration;
		}	
	},
	dragStart(e) {
		e.stopPropagation();
		this.setState({
			isDragging: true
		});
		$(document).on('mousemove.drag', this.onMouseMove);
		$(document).on('mouseup.drag', this.dragEnd);
		$(document).on('touchmove', this.onTouchMove);
		$(document).on('touchend', this.dragEnd);
	},
	dragEnd(e) {
		if(this.state.isDragging === false) {
			return;
		} else {
			$(document).off('mousemove.drag');
			$(document).off('mouseup.drag');
			$(document).off('touchmove');
			$(document).off('touchend');
		}
		this.setState({
			isDragging: false
		});
	},
	onVolumeMouseMove(event){
		let posHeight, pos,self = this, $volumeDrag = $(React.findDOMNode(this)).find('.volume-inner');
		posHeight = $volumeDrag.offset().top + $volumeDrag.height();
		if(event.pageY >= posHeight){
			pos = 0;
		} else {
			pos = (posHeight - event.pageY)/$volumeDrag.height();
			if(pos >= 1){
				pos = 1;
			}
		}
		self.setProps({ controlVolume: pos });
		self.setState({ muteFlg: false });
		videoPlayer[self.props.iterator].mediaApi.setVolume(pos);
		$volumeDrag.find(".volume").css('height', pos*100+'%');
		$volumeDrag.find(".not-volume").css('height', ((1-pos)*100)+'%');
		self.volumeState(self.props.controlVolume);
	},
	onVolumeTouchMove(e){
		e.preventDefault();
		const $this = $(React.findDOMNode(this)),
			touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
			top = $this.offset().top,
			height = $this.height();
		let  posHeight = top + height, pos, self = this;
		if(touch.pageY >= posHeight){
			$this.find(".volume").css('height','0%');
			$this.find(".not-volume").css('height','100%');
			pos = 0;
		} else {
			pos = (posHeight - touch.pageY)/ this.offsetHeight;
		}
		self.setProps({ controlVolume: pos });
		self.setState({ muteFlg: false });
		videoPlayer[self.props.iterator].mediaApi.setVolume(pos);
		$this.find(".volume").css('height', pos*100+'%');
		$this.find(".not-volume").css('height', ((1-pos)*100)+'%');
		self.volumeState(self.props.controlVolume);	
	},
	volumeDragStart(e){
		e.stopPropagation();
		this.setState({
			isDragging: true
		});
		$(document).on('mousemove.vol', this.onVolumeMouseMove);
		$(document).on('mouseup.vol', this.volumeDragEnd);
		$(document).on('touchmove', this.onVolumeTouchMove);
		$(document).on('touchend', this.volumeDragEnd);
	},
	volumeDragEnd(e){
		if(this.state.isDragging === false) {
			return;
		} else {
			$(document).off('mousemove.vol');
			$(document).off('mouseup.vol');
			$(document).off('touchmove');
			$(document).off('touchend');
		}
		this.setState({
			isDragging: false
		});
	},
	ProgressScrub(){
		let $progressDrag = $(React.findDOMNode(this)).find('.on-progress-drag'),
			self = this;
		$progressDrag.on('mousedown', self.dragStart);
		$progressDrag.on('mouseup', self.dragEnd);
		$progressDrag.on('click', self.killEvent);
		$progressDrag.on('touchstart', self.dragStart);
		$progressDrag.on('touchend', self.dragEnd);
	},
	volumeScrub(){
		let $volumeDrag = $(React.findDOMNode(this)).find('.volume-inner'),
			self = this;
		$volumeDrag.on('mousedown', self.volumeDragStart);
		$volumeDrag.on('mouseup', self.volumeDragEnd);
		$volumeDrag.on('click', self.killEvent);
		$volumeDrag.on('touchstart', self.volumeDragStart);
		$volumeDrag.on('touchend', self.volumeDragEnd);
	},
	ba2IsiVideoPause(){
		let self = this;
		videoPlayer[this.props.iterator].mediaApi._v.mediaElement.onplaying = function(){
			if($('.isi').length>0){
				$('.isi-header').on('click touch', function() {
					if($('.isi').hasClass('is-expanded')){
						videoPlayer[self.props.iterator].mediaApi._v.mediaElement.pause();
						self.setState({ playButton: false });
					}
				});
			}
			for(let i=0;i < videoPlayer.length;i++){
				if(i !== self.props.iterator){
					videoPlayer[i].mediaApi._v.mediaElement.pause();
				}
			}
		};
	},
  	render() {
  		const controlClass = cx({
    		'video-controls': true,
    		'video-buttons': true,
    		'is-idle':this.state.isMouseIdle
    	}), isFullscreen = cx({
    		'fs-exit': this.state.fullscreenFlg,
    		'fs': !this.state.fullscreenFlg
    	}), isPlaying = cx({
    		'play': this.state.playButton,
    		'pause': !this.state.playButton 
    	}),	isMute = cx({
    		'unmute': this.state.muteFlg,
    		'volume-low': this.state.volumeLow,
    		'volume-med': this.state.volumeMed,
    		'volume-high': this.state.volumeHigh
    	}), volumeWrap = cx({
    		'volume-wrap': true,
    		'volume-bar-background': this.state.volumeBar
    	}), videoProgress = cx({
    		'video-progress': true,
    		'on-progress-drag': this.state.onProgress 
    	}), volumeBarWrap = cx({
    		'volume-bar-wrap': true,
    		'is-invisible': !this.state.isVisible,
    		'is-visible': this.state.isVisible
    	});			
	   	return (
	   		<div className={controlClass} id={this.props.playerId}>
				<div className={videoProgress}>
			   		<div className="seekslider"></div>
			   		<div className="not-value">
			   			<div className="progress-drag"></div>
			   		</div>
				</div>
			   	<div className="play-buttons-bar">
			   		<div className="playpause">
			   			<button className={isPlaying}></button>
			   		</div>
				    <div className="duration">
				    	<span className="curtimetext">00:00</span>
				    	<span className="separator">/</span>
				    	<span className="durtimetext">00:00</span>
				    </div>
				    <div className={volumeWrap}>
					    <div className={volumeBarWrap}>
							<div className="volume-bar">
							    <div className="volume-inner">
							    	<div className="not-volume"></div>
							    	<div className="volume">
							    		<div className="volume-drag"></div>
							    	</div>
							    </div>
							</div>
						</div>
					    <div className="button-mute">
					    	<button className={isMute}></button>
					    </div>
					</div>
				    <div className="fullscreen">
				    	<button className={isFullscreen}></button>
				    </div>
				</div>
			</div>
		);
  	}
});