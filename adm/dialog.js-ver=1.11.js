/* Version 1.9 */

let dialogactive = false,
	dialogwait = false,
	dialog_form_method = '',
	dialog_form_url = '',
	last_dialog_item = -1,
	dialog_selected_option = '';
	
const DIALOG_STYLE_MSGBOX = 	'0',
	  DIALOG_STYLE_INPUT = 		'1',
	  DIALOG_STYLE_PASSWORD = 	'3',
	  DIALOG_STYLE_SELECTBOX = 	'4',
	  DIALOG_STYLE_TEXTAREA = 	'5',
	  DIALOG_STYLE_IMAGE = 		'6',
	  DIALOG_STYLE_MSGWAIT = 	'7',
	  DIALOG_STYLE_LIST = 		'8',
	  DIALOG_STYLE_VIDEO = 		'9',
	  DIALOG_STYLE_AUDIO = 		'10',
	  DIALOG_STYLE_FORM = 		'11';

function ShowUserDialog(dialogid,style,caption,info,button1,button2,default_value = "",error = false,wait_for_response = false){
	if(style == DIALOG_STYLE_MSGWAIT) dialogwait = true;
	dialogactive = true;
	let elementid = $('#dialog');
	switch(style){
		case DIALOG_STYLE_MSGBOX: {
			elementid.attr("class","_DIALOG_STYLE _DIALOG_STYLE_MSGBOX _DIALOG_DISABLE_TEXT_SELECT _DIALOG_B_BLACK _DIALOG_B_ROUNDED");
			let output = "";
			output += GetDialogDefaultOutput(caption,info) + GetDialogButtons(dialogid,style,wait_for_response,button1,button2);
			elementid.html(output);
			ShowDialog();
			return 1;
		}
		case DIALOG_STYLE_INPUT: {
			elementid.attr("class","_DIALOG_STYLE _DIALOG_STYLE_MSGBOX _DIALOG_DISABLE_TEXT_SELECT _DIALOG_B_BLACK _DIALOG_B_ROUNDED");
			let output = "";
			output += GetDialogDefaultOutput(caption,info);
			output += '<input type="text" id="dialog_input" class="_DIALOG_B_VIOLET _DIALOG_B_ALL _DIALOG_H_INPUT _DIALOG_STYLE_INPUT_TEXT" autocomplete="off" placeholder="' + default_value + '">';
			output += '<br><br>';
			output += GetDialogButtons(dialogid,style,wait_for_response,button1,button2);
			elementid.html(output);
			if(error) $('#dialog_input').addClass("_DIALOG_INPUT_ERROR");
			ShowDialog();
			return 1;
		}
		case DIALOG_STYLE_PASSWORD: {
			elementid.attr("class","_DIALOG_STYLE _DIALOG_STYLE_MSGBOX _DIALOG_DISABLE_TEXT_SELECT _DIALOG_B_BLACK _DIALOG_B_ROUNDED");
			let output = "";
			output += GetDialogDefaultOutput(caption,info);
			output += '<input type="password" id="dialog_input" class="_DIALOG_B_VIOLET _DIALOG_B_ALL _DIALOG_H_INPUT _DIALOG_STYLE_INPUT_TEXT" placeholder="' + default_value + '">';
			output += '<br><br>';
			output += GetDialogButtons(dialogid,style,wait_for_response,button1,button2);
			elementid.html(output);
			if(error) $('#dialog_input').addClass("_DIALOG_INPUT_ERROR");
			ShowDialog();
			return 1;
		}
		case DIALOG_STYLE_SELECTBOX: {
			elementid.attr("class","_DIALOG_STYLE _DIALOG_STYLE_MSGBOX _DIALOG_DISABLE_TEXT_SELECT _DIALOG_B_BLACK _DIALOG_B_ROUNDED");
			let output = "";
			output += '<div id="DIALOG_STYLE_MSGBOX_CAPTION">' + caption + '</div><br>';
			output += '<div id="DIALOG_STYLE_MSGBOX_INFO" class="_DIALOG_ENABLE_TEXT_SELECT">' + info + '</div><br>';
			output += GetDialogButtons(dialogid,style,wait_for_response,button1,button2);
			elementid.html(output);
			ShowDialog();
			return 1;
		}
		case DIALOG_STYLE_TEXTAREA: {
			elementid.attr("class","_DIALOG_STYLE _DIALOG_STYLE_CONTENT _DIALOG_DISABLE_TEXT_SELECT _DIALOG_B_BLACK _DIALOG_B_ROUNDED");
			let output = "";
			output += '<div id="DIALOG_STYLE_MSGBOX_CAPTION" class="_DIALOG_ENABLE_TEXT_SELECT">' + caption + '</div><br>';
			output += '<div id="DIALOG_STYLE_MSGBOX_INFO" class="_DIALOG_ENABLE_TEXT_SELECT">' + info + '</div><br>';
			output += '<textarea spellcheck="false" id="dialog_input" class="_DIALOG_STYLE_TEXTAREA _DIALOG_B_VIOLET _DIALOG_B_ALL" wrap="soft">' + default_value + '</textarea>';
			output += '<br><br>';
			output += GetDialogButtons(dialogid,style,wait_for_response,button1,button2);
			elementid.html(output);
			if(error) $('#dialog_input').addClass("_DIALOG_INPUT_ERROR");
			ShowDialog();
			return 1;
		}
		case DIALOG_STYLE_IMAGE: {
			elementid.attr("class","_DIALOG_STYLE _DIALOG_STYLE_CONTENT _DIALOG_DISABLE_TEXT_SELECT _DIALOG_B_BLACK _DIALOG_B_ROUNDED");
			let output = "";
			output += '<div id="DIALOG_STYLE_MSGBOX_CAPTION" class="_DIALOG_ENABLE_TEXT_SELECT">' + caption + '</div><br>';
			output += '<div id="DIALOG_STYLE_MSGBOX_INFO" class="_DIALOG_ENABLE_TEXT_SELECT"><a href="'+info+'" target="_blank"><img class="_DIALOG_IMAGE" src="'+info+'" /></a></div><br>';
			output += GetDialogButtons(dialogid,style,wait_for_response,button1,button2);
			elementid.html(output);
			ShowDialog();
			return 1;
		}
		case DIALOG_STYLE_MSGWAIT: {
			elementid.attr("class","_DIALOG_STYLE _DIALOG_STYLE_MSGBOX _DIALOG_DISABLE_TEXT_SELECT _DIALOG_B_BLACK _DIALOG_B_ROUNDED");
			elementid.html(GetDialogDefaultOutput(caption,info));
			$("#dialog").show("slow");
			return 1;
		}
		case DIALOG_STYLE_LIST: {
			elementid.attr("class","_DIALOG_STYLE _DIALOG_STYLE_CONTENT _DIALOG_DISABLE_TEXT_SELECT _DIALOG_B_BLACK _DIALOG_B_ROUNDED");
			let output = "", data = info.split(';');
			output += '<div id="DIALOG_STYLE_MSGBOX_CAPTION">' + caption + '</div><br>';
			output += '<center><table width="20%">';
			for(i = 0, j = data.length; i < j; i++){
				output += '<tr><td width="100%"><div class="_DIALOG_STYLE_SELECT_OPTION _DIALOG_BUTTON_GREEN _DIALOG_B_ALL _DIALOG_TEXT _DIALOG_H" id="dialog_option_' + i + '" onclick="DialogSetOption(' + i + ',\'' + data[i] + '\')">' + data[i] + '</div></td></tr>';
			}
			output += '</table></center><br>';
			output += GetDialogButtons(dialogid,style,wait_for_response,button1,button2);
			elementid.html(output);
			ShowDialog();
			return 1;
		}
		case DIALOG_STYLE_VIDEO: {
			elementid.attr("class","_DIALOG_STYLE _DIALOG_STYLE_CONTENT _DIALOG_DISABLE_TEXT_SELECT _DIALOG_B_BLACK _DIALOG_B_ROUNDED");
			let output = "", video_options = '';
			if(IsDialogToggle('dialog_video_loop')) video_options += ' loop';
			if(IsDialogToggle('dialog_video_autoplay')) video_options += ' autoplay';
			if(IsDialogToggle('dialog_video_muted')) video_options += ' muted';
			output += '<div id="DIALOG_STYLE_MSGBOX_CAPTION" class="_DIALOG_ENABLE_TEXT_SELECT">' + caption + '</div><br>';
			output += '<center><table style="width:50%;min-width:300px;"><tr>';
			output += '<td width="33.3%"><center><div id="dialog_video_loop" class="_DIALOG_STYLE_MSGBOX_BUTTON '+(IsDialogToggle('dialog_video_loop') ? '_DIALOG_BUTTON_GREEN' : '_DIALOG_BUTTON_RED')+' _DIALOG_B_ALL _DIALOG_TEXT _DIALOG_H" onclick="DialogToggleLoop()">'+DIALOG_LANG_LOOP+'</div></center></td>';
			output += '<td width="33.3%"><center><div id="dialog_video_autoplay" class="_DIALOG_STYLE_MSGBOX_BUTTON '+(IsDialogToggle('dialog_video_autoplay') ? '_DIALOG_BUTTON_GREEN' : '_DIALOG_BUTTON_RED')+' _DIALOG_B_ALL _DIALOG_TEXT _DIALOG_H" onclick="DialogToggleAutoPlay()">'+DIALOG_LANG_AUTOPLAY+'</div></center></td>';
			output += '<td width="33.3%"><center><div id="dialog_video_muted" class="_DIALOG_STYLE_MSGBOX_BUTTON '+(IsDialogToggle('dialog_video_muted') ? '_DIALOG_BUTTON_GREEN' : '_DIALOG_BUTTON_RED')+' _DIALOG_B_ALL _DIALOG_TEXT _DIALOG_H" onclick="DialogToggleMuted()">'+DIALOG_LANG_MUTE+'</div></center></td>';
			output += '</tr></table></center><br>';
			output += '<div id="DIALOG_STYLE_MSGBOX_INFO" class="_DIALOG_ENABLE_TEXT_SELECT"><video class="_DIALOG_IMAGE _DIALOG_VIDEO" '+video_options+' controls><source src="'+info+'" type="video/'+default_value+'">'+DIALOG_VIDEO_NOT_SUPPORTED+'.</video></div><br>';
			output += GetDialogButtons(dialogid,style,wait_for_response,button1,button2);
			elementid.html(output);
			ShowDialog();
			return 1;
		}
		case DIALOG_STYLE_AUDIO: {
			elementid.attr("class","_DIALOG_STYLE _DIALOG_STYLE_MSGBOX _DIALOG_DISABLE_TEXT_SELECT _DIALOG_B_BLACK _DIALOG_B_ROUNDED");
			let output = "";
			output += '<div id="DIALOG_STYLE_MSGBOX_CAPTION" class="_DIALOG_ENABLE_TEXT_SELECT">' + caption + '</div><br>';
			output += '<div id="DIALOG_STYLE_MSGBOX_INFO" class="_DIALOG_ENABLE_TEXT_SELECT"><audio class="_DIALOG_IMAGE _DIALOG_AUDIO" controls autoplay><source src="'+info+'" type="audio/'+default_value+'">'+DIALOG_AUDIO_NOT_SUPPORTED+'</audio></div><br>';
			output += GetDialogButtons(dialogid,style,wait_for_response,button1,button2);
			elementid.html(output);
			ShowDialog();
			return 1;
		}
		case DIALOG_STYLE_FORM: {
			elementid.attr("class","_DIALOG_STYLE _DIALOG_STYLE_FORM _DIALOG_DISABLE_TEXT_SELECT _DIALOG_B_BLACK _DIALOG_B_ROUNDED");
			let output = "", data = info.split(';');
			output += '<div id="DIALOG_STYLE_MSGBOX_INFO"><form id="dialog_form">' + caption + '</form></div><br>';
			dialog_form_method = data[0];
			dialog_form_url = data[1];
			output += GetDialogButtons(dialogid,style,wait_for_response,button1,button2);
			elementid.html(output);
			ShowDialog();
			return 1;
		}
	}
	return 0;
}
	
function ShowDialog(){
	if(dialogwait){
		dialogwait = false;
		$("#dialog").show();
	} else {
		$("#dialog").show("slow");
	}
}

function GetDialogDefaultOutput(caption,info){
	return '<div id="DIALOG_STYLE_MSGBOX_CAPTION">' + caption + '</div><br><div id="DIALOG_STYLE_MSGBOX_INFO">' + info + '</div><br>';
}

function GetDialogButtons(dialogid,style,wait_for_response,button1,button2){
	let output = '';
	output += '<center><table style="width:50%;min-width:300px;"><tr>';
	if(button2 == ""){
		output += '<td width="33.3%">&nbsp;</td>';
		output += '<td width="33.3%"><center><div class="_DIALOG_FALSE _DIALOG_TRUE _DIALOG_STYLE_MSGBOX_BUTTON _DIALOG_BUTTON_GREEN _DIALOG_B_ALL _DIALOG_TEXT _DIALOG_H" onclick="DialogResponse(\'' + dialogid + '\',\'' + style + '\',true,'+wait_for_response+')">' + button1 + '</div></center></td>';
		output += '<td width="33.3%">&nbsp;</td>';
	} else {
		output += '<td width="33.3%"><center><div class="_DIALOG_TRUE _DIALOG_STYLE_MSGBOX_BUTTON _DIALOG_BUTTON_GREEN _DIALOG_B_ALL _DIALOG_TEXT _DIALOG_H" onclick="DialogResponse(\'' + dialogid + '\',\'' + style + '\',true,'+wait_for_response+')">' + button1 + '</div></center></td>';
		output += '<td width="33.3%">&nbsp;</td>';
		output += '<td width="33.3%"><center><div class="_DIALOG_FALSE _DIALOG_STYLE_MSGBOX_BUTTON _DIALOG_BUTTON_RED _DIALOG_B_ALL _DIALOG_TEXT _DIALOG_H" onclick="DialogResponse(\'' + dialogid + '\',\'' + style + '\',false,'+wait_for_response+')">' + button2 + '</div></center></td>';
	}
	output += '</tr></table></center><br>';
	return output;
}

function DialogSetOption(id,name){
	if(last_dialog_item == id){
		$('#dialog_option_' + last_dialog_item).removeClass('_DIALOG_BUTTON_AQUA');
		$('#dialog_option_' + last_dialog_item).addClass('_DIALOG_BUTTON_GREEN');
		last_dialog_item = -1;
		return 0;
	} else if(last_dialog_item != -1){
		$('#dialog_option_' + last_dialog_item).removeClass('_DIALOG_BUTTON_AQUA');
		$('#dialog_option_' + last_dialog_item).addClass('_DIALOG_BUTTON_GREEN');
	}
	last_dialog_item = id;
	$('#dialog_option_' + last_dialog_item).removeClass('_DIALOG_BUTTON_GREEN');
	$('#dialog_option_' + last_dialog_item).addClass('_DIALOG_BUTTON_AQUA');
	dialog_selected_option = name;
	return 1;
}

function DialogToggleLoop(){
	if(DialogToggle("dialog_video_loop")){
		$("._DIALOG_VIDEO").prop("loop",true);
	} else {
		$("._DIALOG_VIDEO").prop("loop",false);
	}
}

function DialogToggleAutoPlay(){
	if(DialogToggle("dialog_video_autoplay")){
		$("._DIALOG_VIDEO").prop("autoplay",true);
	} else {
		$("._DIALOG_VIDEO").prop("autoplay",false);
	}
}

function DialogToggleMuted(){
	if(DialogToggle("dialog_video_muted")){
		$("._DIALOG_VIDEO").prop("muted",true);
	} else {
		$("._DIALOG_VIDEO").prop("muted",false);
	}
}

function IsDialogToggle(attribute_name){
	return (getCookie(attribute_name) == 1 ? 1 : 0);
}

function DialogToggle(attribute_name){
	let div = $("#"+attribute_name), state = 0;
	if(div.hasClass('_DIALOG_BUTTON_RED')){
		div.removeClass('_DIALOG_BUTTON_RED');
		div.addClass('_DIALOG_BUTTON_GREEN');
		state = 1;
	} else {
		div.removeClass('_DIALOG_BUTTON_GREEN');
		div.addClass('_DIALOG_BUTTON_RED');
		state = 0;
	}
	setCookie(attribute_name,state,365);
	return state;
}

function DialogResponse(dialogid,style,response,wait_for_response){
	let listitem = -1, inputtext = "null";
	if(!wait_for_response || !response) $("#dialog").hide("slow");
	
	switch(style){
		case DIALOG_STYLE_INPUT: {
			inputtext = $('#dialog_input').val();
			break;
		}
		case DIALOG_STYLE_PASSWORD: {
			inputtext = $('#dialog_input').val();
			break;
		}
		case DIALOG_STYLE_TEXTAREA: {
			inputtext = $('#dialog_input').val();
			break;
		}
		case DIALOG_STYLE_LIST: {
			inputtext = dialog_selected_option;
			listitem = last_dialog_item;
			break;
		}
		case DIALOG_STYLE_VIDEO:{
			$('._DIALOG_VIDEO').trigger('pause');
			break;
		}
		case DIALOG_STYLE_AUDIO:{
			$('._DIALOG_AUDIO').trigger('pause');
			break;
		}
		case DIALOG_STYLE_FORM: {
			if(response){
				$.ajax({
					type: dialog_form_method,
					url: dialog_form_url,
					data: $("#dialog_form").serialize(),
					success: function(result){
						dialogactive = false;
						OnUserDialogResponse(dialogid,1,listitem,result);
					}
				});
				return 1;
			}
			break;
		}
	}
	dialogactive = false;
	OnUserDialogResponse(dialogid,response,listitem,inputtext);
	return 1;
}

$(document).keyup(function(e){
	if(dialogactive){
		switch(e.keyCode){
			case 13: {
				$("._DIALOG_TRUE").trigger('click');
				break;
			}
			case 27: {
				$("._DIALOG_FALSE").trigger('click');
				break;
			}
		}	
	}
});