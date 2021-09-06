const	DIALOG_ID_NULL =					'0';

let selected_file = ".nul",
	last_directory = "",
	last_file_name = "",
	is_locked = false,
	file_to_download,
	user_list_type = 'a',
	cache_rename_path = '',
	cache_rename_name = '',
	cache_rename_extension = '',
	cache_last_open_item = -1,
	cache_object_to_delete = -1;

function OnUserDialogResponse(dialogid,response,listitem,inputtext){
	
	return 1;
}

function Share_Link(link){
	ShowUserDialog(DIALOG_ID_NULL,DIALOG_STYLE_SELECTBOX,"Directly link",link,LANG_BUTTON_CANCEL,"");
}

function Open_TXT(file_name,force=false){
	if(dialogactive && !force) return 0;
	selected_file = file_name;
	$.post("https://adm.ct8.pl/download/file-manager/get_file_content.php",{
		'file_name' : file_name,
		'current_directory' : last_directory
	}).done(function(result){
		ShowUserDialog(DIALOG_ID_NULL,DIALOG_STYLE_TEXTAREA,file_name,"",LANG_BUTTON_CLOSE,"",result,false,true);
	});
	return 1;
}

function Open_Image(title,file_name,force=false){
	if(dialogactive && !force) return 0;
	ShowUserDialog(DIALOG_ID_NULL,DIALOG_STYLE_IMAGE,title,file_name,LANG_BUTTON_CLOSE,"");
	return 1;
}

function Open_Video(title,file_name,extension,force=false){
	if(dialogactive && !force) return 0;
	ShowUserDialog(DIALOG_ID_NULL,DIALOG_STYLE_VIDEO,title,file_name,LANG_BUTTON_CLOSE,"",extension);
	return 1;
}

function Open_Audio(title,file_name,extension,force=false){
	if(dialogactive && !force) return 0;
	if(extension == 'm4a') extension = 'mp4';
	ShowUserDialog(DIALOG_ID_NULL,DIALOG_STYLE_AUDIO,title,file_name,LANG_BUTTON_CLOSE,"",extension);
	return 1;
}

function Open_Bind(){
	$(".file_manager_item").unbind('click');
	$(".file_manager_item").click(function(e){
		force = false;
		if(e.isTrigger !== undefined) force = true;
		cache_last_open_item = $(this).data('id');
		switch($(this).data('type')){
			case 'PHOTO': {
				Open_Image($(this).data('title'),$(this).data('filename'),force);
				break;
			}
			case 'VIDEO': {
				Open_Video($(this).data('title'),$(this).data('filename'),$(this).data('extension'),force);
				break;
			}
			case 'AUDIO': {
				Open_Audio($(this).data('title'),$(this).data('filename'),$(this).data('extension'),force);
				break;
			}
		}
	});
}

function Open_Previous(){
	if(!dialogactive) return 0;
	let idx = cache_last_open_item-1, item = $(".file_manager_item[data-id="+idx+"]").data('id');
	if(item != undefined){
		$(".file_manager_item[data-id="+idx+"]").trigger('click');
		cache_last_open_item = idx;
	}
	return 1;
}

function Open_Next(){
	if(!dialogactive) return 0;
	let idx = cache_last_open_item+1, item = $(".file_manager_item[data-id="+idx+"]").data('id');
	if(item != undefined){
		$(".file_manager_item[data-id="+idx+"]").trigger('click');
		cache_last_open_item = idx;
	}
	return 1;
}

function SetPath(current_directory){
	if(dialogactive) return 0;
	$("#output_container").html('<div class="spinner-border text-primary" role="status" style="width:5rem;height:5rem;"><span class="sr-only">Loading...</span></div>').show();	
	$.post("file-manager/get_list_"+user_list_type+".php",{
		'current_directory' : current_directory
	}).done(function(result){
		last_directory = current_directory;
		setCookie('last_directory',last_directory,365);
		$("#output_container").html(result);
		Open_Bind();
		SwitchListUpdate();
	});
	return 1;
}

function RefreshPath(){
	$("#output_container").html('<div class="spinner-border text-primary" role="status" style="width:5rem;height:5rem;"><span class="sr-only">Loading...</span></div>').show();	
	$.post("file-manager/get_list_"+user_list_type+".php",{
		'current_directory' : last_directory
	}).done(function(result){
		$("#output_container").html(result);
		Open_Bind();
		SwitchListUpdate();
	});
}

function SwitchListUpdate(){
	if(user_list_type == 'a'){
		$("#switch_list_type").html('<svg width="1em" height="1em" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="th" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-th fa-w-16"><path fill="currentColor" d="M149.333 56v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V56c0-13.255 10.745-24 24-24h101.333c13.255 0 24 10.745 24 24zm181.334 240v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm32-240v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24zm-32 80V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm-205.334 56H24c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zm386.667-56H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm0 160H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zM181.333 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24z" class=""></path></svg>');
	} else {
		$("#switch_list_type").html('<svg width="1em" height="1em" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="list" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-list fa-w-16"><path fill="currentColor" d="M80 368H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm0-320H16A16 16 0 0 0 0 64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16zm0 160H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm416 176H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z" class=""></path></svg>');
	}
}

function SwitchListType(){
	if(user_list_type == 'a'){
		user_list_type = 'b';
		$("#list_type_button").html('Szczegóły');
	} else {
		user_list_type = 'a';
		$("#list_type_button").html('Kafelki');
	}
	setCookie("filemanager_list_type",user_list_type,365);
	RefreshPath();
}

$(function() {
    $(document).keyup(function(e) {
        switch(e.keyCode) {
            case 37: {
				Open_Previous();
				break;
			}
            case 39: {
				Open_Next();
				break;
			}
        }
    });
});