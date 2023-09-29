/*!
 * Register.js v1.0.0
 * (c) 2022-2023 Marlon Cruz Ovalles kurosaky970828@gmail.com
 * Mmenu Company 
 * menu24horas.com
 * Released under the MIT License.
 */
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

var TKT = AolaxReactive({
    el: "#multi_step_sign_up",
    data: {
        linetype: "-",
        separador: '---',
        totMax: 348,
    },
    methods: {
        init: function(){
			this.validatePaso();

            $(document).ready(function() {
				// $('.theme-loader').addClass('loaded');
				$('.theme-loader').animate({
					'opacity': '0',
				}, 1200);
				setTimeout(function() {
					$('.theme-loader').remove();
				}, 2000);
				// $('.pcoded').addClass('loaded');
			});
			$('form').on('submit', function(e) {});

			$('#btn_send').on('click', function(){
				fn 	 = $('#fname');
				ln   = $('#lname');
				ph   = $('#phone');
				ad  = $('#address');
				isok = true;
				if(!isok) return;

				$('form').submit();
			});
			$(".next").on('click',function(){
				if($(this).attr('btn') == 'auth_twitter') TKT.auth_twitter(this);
				if($(this).attr('btn') == 'auth_telegram') TKT.auth_telegram(this);
				if($(this).attr('btn') == 'auth_telegram_code') TKT.verifiCode(this);
			});
			$(".previous").on('click',function(){
				if(animating) return false;
				animating = true;
				
				current_fs = $(this).parent();
				previous_fs = $(this).parent().prev();
				
				//de-activate current step on progressbar
				$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
				
				//show the previous fieldset
				previous_fs.show(); 
				//hide the current fieldset with style
				current_fs.animate({opacity: 0}, {
					step: function(now, mx) {
						//as the opacity of current_fs reduces to 0 - stored in "now"
						//1. scale previous_fs from 80% to 100%
						scale = 0.8 + (1 - now) * 0.2;
						//2. take current_fs to the right(50%) - from 0%
						left = ((1-now) * 50)+"%";
						//3. increase opacity of previous_fs to 1 as it moves in
						opacity = 1 - now;
						current_fs.css({'left': left});
						previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
					}, 
					duration: 800, 
					complete: function(){
						current_fs.hide();
						animating = false;
					}, 
					//this comes from the custom easing plugin
					easing: 'easeInOutBack'
				});
			});
        },
		auth_twitter: function(e){
			/*
			ru = $('#rules');
			if (ru.is(":checked")) {
				$("#tiprules").hide();
				
			} else {
				tip = $("#tiprules");
				w = (tip.parent().width() / 2 - tip.width() / 2) + "px";
				tip.css("left", w).show();
				isok = false;
			}
			*/
			this.startNext(e);
			//window.location.href = "http://127.0.0.1:5000";
			return;
		},
		auth_telegram: function(e){
			that = this;
			var user = $('#telegramUsername').val();
			var url = new URL("http://127.0.0.1:5000/api/telegram")
			//var url = new URL("https://telegrambottkt.onrender.com/api/telegram");//encodeURI('');
			//var url2 = new URL("https://telegrambottkt.onrender.com/api/telegram?token=tktk9wv7I8UU26FGGhtsSyMgZv8caqygNgPVMrdDw02IZlnRhbK3s&user=Davier&group=TktPrueva&type=broadcast")
			//'thekeyoftrueTKT',
			
			json = {
				token: "tktk9wv7I8UU26FGGhtsSyMgZv8caqygNgPVMrdDw02IZlnRhbK3s",
				username: user,
				group: "thekeyoftrueTKT",
				type: "broadcast"
			}
			this.loaderShow();
			$.ajax({
                url : url,
                data : JSON.stringify(json),
				contentType: "application/json",
				method: "POST",
				success : function(r){
					
					console.log(r.response)
					if(r.response == 'user_ok'){
						that.setCookie("telegramhash", JSON.stringify(r.hash));
						that.setCookie("telegramid", JSON.stringify(r.id));
						that.loaderHideOk();
						window.setTimeout(function(){
							
						}, 1000)
						
					}
					else if(r.response == 'user_exist'){
						that.loaderHide();
						window.setTimeout(function(){
							swal("Error", "The user '"+user.toUpperCase()+"' already received the tokens, please use another account", "error");
						}, 400)
					}
					else if(r.response == 'user_not_registry'){
						that.loaderHide();
						window.setTimeout(function(){
							swal("Error", "The user '"+user.toUpperCase()+"' is not a 'The Key of True - TKT Oficial' channel subscriber, visit https://t.me/thekeyoftrueTKT", "error");
						}, 400)
						
					}
					else if(r.response == 'user_timeout'){
						that.loaderHide();
						window.setTimeout(function(){
							$('#telegramCode').val("");
							swal("Error", "Para solicitar el codigo de nuevo son 130s de espera.", "error");
						}, 400)
					}
					
                },
                error: function(error){
					that.loaderHide();
					swal("Error", "An unexpected error has occurred, please try again.", "error");
                }
        	});
		},
		verifiCode: function(){
			var btn = $('button[btn="auth_telegram_code"]')
			that = this;
			var user = $('#telegramUsername').val();
			var code = $('#telegramCode').val();
			var url = new URL("http://127.0.0.1:5000/api/telegram/code")
			//var url = new URL("https://telegrambottkt.onrender.com/api/telegram");//encodeURI('');
			//var url2 = new URL("https://telegrambottkt.onrender.com/api/telegram?token=tktk9wv7I8UU26FGGhtsSyMgZv8caqygNgPVMrdDw02IZlnRhbK3s&user=Davier&group=TktPrueva&type=broadcast")
			//'thekeyoftrueTKT',
			var hash = this.getCookie("telegramhash");
			var id = this.getCookie("telegramid");
			json = {
				token: "tktk9wv7I8UU26FGGhtsSyMgZv8caqygNgPVMrdDw02IZlnRhbK3s",
				hash: hash,
				id: id,
				code: code,
			}
			this.loaderShow();
			$.ajax({
                url : url,
                data : JSON.stringify(json),
				contentType: "application/json",
				method: "POST",
				success : function(r){
					
					console.log(r.response)
					if(r.response == 'code_ok'){
						//that.setCookie("telegramhash", JSON.stringify(r.data.hash));
						that.loaderHideOk();
						window.setTimeout(function(){
							that.startNext(btn);
						}, 1000)
						
					}
					else if(r.response == 'code_error'){
						that.loaderHide();
						window.setTimeout(function(){
							$('#telegramCode').val("");
							swal("Error", "El codigo no es correcto por favor buelva a intentarlo", "error");
						}, 400)
					}
					else if(r.response == 'code_error_time'){
						that.loaderHide();
						window.setTimeout(function(){
							$('#telegramCode').val("");
							swal("Error", "Ya an pasado mas de 10 min vuelva a verificar su usuario", "error");
						}, 400)
					}
					else if(r.response == 'user_timeout'){
						that.loaderHide();
						window.setTimeout(function(){
							$('#telegramCode').val("");
							swal("Error", "Para solicitar el codigo de nuevo son 130s de espera.", "error");
						}, 400)
					}
                },
                error: function(error){
					that.loaderHide();
					swal("Error", "An unexpected error has occurred, please try agains.", "error");
                }
        	});
		},
		auth_metamask: function(e){
			that = this;
			var wallet = $('#wallet').val();
			twitterhash = this.getCookie('twitterhash')
			telegramhash = this.getCookie('telegramhash')
			var url = new URL("https://127.0.0.1:5000/api/walet");//encodeURI('');
			//var url2 = new URL("https://telegrambottkt.onrender.com/api/telegram?token=tktk9wv7I8UU26FGGhtsSyMgZv8caqygNgPVMrdDw02IZlnRhbK3s&user=Davier&group=TktPrueva&type=broadcast")
			//'thekeyoftrueTKT',
			
			json = {
				token: "tktk9wv7I8UU26FGGhtsSyMgZv8caqygNgPVMrdDw02IZlnRhbK3s",
				wallet: wallet,
				twitter: twitterhash,
				telegram: telegramhash
			}
			$.ajax({
                url : url,
                data : JSON.stringify(json),
				contentType: "application/json",
				method: "POST",
				success : function(r){
						console.log(r.response)
						if(r.response == 'user_ok'){
							that.setCookie("telegramuser", JSON.stringify(r));
							that.startNext(e);
						}
						else if(r.response == 'user_exist'){
							swal("Error", "The user '"+user.toUpperCase()+"' already received the tokens, please use another account", "error");
						}
						else if(r.response == 'user_not_registry'){
							swal("Error", "The user '"+user.toUpperCase()+"' is not a 'The Key of True - TKT Oficial' channel subscriber, visit https://t.me/thekeyoftrueTKT", "error");
						}//The Key of True - TKT Oficial
                },
                error: function(error){
                    that.loaderHide();
					swal("Error", "An unexpected error has occurred, please try agains.", "error");
                }
        	});
		},
		startNext: function(elemt){
			if(animating) return false;
			animating = true;
			current_fs = $(elemt).parent();
			next_fs = $(elemt).parent().next();
			
			//activate next step on progressbar using the index of next_fs
			$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
			
			//show the next fieldset
			next_fs.show(); 
			//hide the current fieldset with style
			current_fs.animate({opacity: 0}, {
				step: function(now, mx) {
					//as the opacity of current_fs reduces to 0 - stored in "now"
					//1. scale current_fs down to 80%
					scale = 1 - (1 - now) * 0.2;
					//2. bring next_fs from the right(50%)
					left = (now * 50)+"%";
					//3. increase opacity of next_fs to 1 as it moves in
					opacity = 1 - now;
					current_fs.css({
						'transform': 'scale('+scale+')',
						'position': 'absolute'
					});
					next_fs.css({'left': left, 'opacity': opacity});
				}, 
				duration: 800, 
				complete: function(){
					current_fs.hide();
					animating = false;
				}, 
				//this comes from the custom easing plugin
				easing: 'easeInOutBack'
			});
		},
		setCookie: function(name, value, days=365){
			var d = new Date();
			d.setTime(d.getTime() + 24*60*60*1000*days);
			document.cookie = name + "=" + value + ";path=/; secure = true; expires=" + d.toGMTString() +"; max-age=" + d.toGMTString();
		},
		getCookie: function(name){
			var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
			return v ? v[2] : false;
		},
		loaderShow: function(){
			$('#loader_verificacion_overlay').show()
			$('#loader_verificacion .sa-success').hide()
			$('#sa_success_text').hide()
			$('#loader_verificacion #pre_loader2').show()
			$('#loader_verificacion #pre_loader_3').show()
			$('#loader_verificacion #pre_loader_text').show()
			$('#loader_verificacion').show()
		},
		loaderHide: function(){
			console.log("loaderHide")
			$('#loader_verificacion_overlay').show()
			$('#loader_verificacion .sa-success').show()
			$('#loader_verificacion #pre_loader2').hide()
			$('#loader_verificacion #pre_loader_3').hide()
			$('#loader_verificacion #pre_loader_text').hide()
			$('#loader_verificacion').hide()
			$('#loader_verificacion_overlay').hide()
			console.log("loaderHide2")
		},
		loaderHideOk: function(){
			$('#loader_verificacion .sa-success').show()
			$('#sa_success_text').show()
			$('#loader_verificacion #pre_loader2').hide()
			$('#loader_verificacion #pre_loader_3').hide()
			$('#loader_verificacion #pre_loader_text').hide()
			window.setTimeout(()=>{
				$('#loader_verificacion').hide()
				$('#loader_verificacion_overlay').hide()
			}, 1000)
		},
		validatePaso: function(){
			var twitteralert = this.getCookie('twitteralert')
			if(!twitteralert){
				var twitterfollow = this.getCookie('twitterfollow')
				if(twitterfollow){
					username = this.getCookie('twitterusername')
					if(twitterfollow == "invalid"){
						swal("Error", "The user '"+username.toUpperCase()+"' is not yet following our Twitter account, please follow the required steps to continue with the process.", "error");
					}else if(twitterfollow == 'valid'){
						swal("Success", "Your user has been successfully verified.", "success");
					}else if(twitterfollow == 'notexist'){
						swal("Error", "The  Username '"+username.toUpperCase()+"' does not exist.", "error");
					}else{
						swal("Error", "An unexpected error has occurred, please try again.", "error");
					}
					this.setCookie('twitteralert', true);
				}
			}
		},
		congratulation: function(){
			var myCanvas = document.createElement('canvas');
			document.body.appendChild(myCanvas);

			var myConfetti = confetti.create(myCanvas, {
			resize: true,
			useWorker: true
			});
			myConfetti({
			particleCount: 100,
			spread: 160
			// any other options from the global
			// confetti function
			});
		}
    },
    styles: `
		#msform {
			margin: 10px auto !important;
		}
		#progressbar {
			margin-bottom: 20px !important;
		}
		#progressbar i::before {
			font-size: 15px;
			color: rgb(137, 188, 255) !important;
		}
		#progressbar li{
			color: rgb(137, 188, 255) !important;
		}
		#msform #progressbar li.active::before, #progressbar li.active::after {
			background: rgb(137, 188, 255) !important;
		}
		body {
			overflow-y: show;
		}
		ul {
			counter-reset: step;
		}
		#process li {
			display: flex;
		}
		#process li + li {
			margin-top: 5px;
		}
		.counters {
			background: rgba(1, 181, 255, 0.19);
			border-radius: 50%;
			width: 13px;
			height: 14px;
			margin: auto 3px auto 0;
			color: white;
			font-size: 11px;
			text-align: center;
			align-content: center;
			display: flex;
			align-items: center;
		}
    `,
});
/*
function() {
	user = $('#username');
	em = $('#email');
	pw = $('#passw');
	cpw = $('#passw2');
	ru = $('#rules');
	isok = true;
	elemt = this;
	//validando Usuarios password y email
	var url = encodeURI('login.php?page=register&mode=ValidRegister&user=' + user.val() + '&email=' + em.val() + '&pass=' + pw.val() + "&pass2=" + cpw.val());
  
	$.post(url, $(this).serialize(), function(data) {
  
	  if (data.code == 200) {
  
		if (data.data.username != undefined) {
		  tip = $("#tipusername");
  
		  $("#tipusername .tooltip-inner b").text("" + data.data.username);
		  w = (tip.parent().width() / 2 - tip.width() / 2) + "px";
		  tip.css("left", w).show();
		  user.css('background', "#fd972b30");
		  isok = false;
		} else {
		  user.css('background', "#fff");
		}
		if (ru.is(":checked")) {
		  $("#tiprules").hide();
		} else {
		  tip = $("#tiprules");
		  w = (tip.parent().width() / 2 - tip.width() / 2) + "px";
		  tip.css("left", w).show();
		  isok = false;
		}
	  } else {
		isok = false;
	  }
	  if (!isok) return;
	  startNext(elemt);
	}, 'json');
}
*/
/*
$(function() {
	$('form').on('submit', function(e) {});

	$('#btn_send').on('click', function(){
		fn 	 = $('#fname');
		ln   = $('#lname');
		ph   = $('#phone');
		ad  = $('#address');
		isok = true;
		
		if(fn.val().length < 3){
			tip = $("#tipfname");
			
			$("#tipfname .tooltip-inner b").text("Ingrese un Nombre Valido");
			w = (tip.parent().width() / 2 - tip.width() / 2)+"px";
			tip.css("left", w).show();
			fn.css('background', "#fd972b30");
			isok = false;
		}
		else{
			fn.css('background', "#fff");
		}
		if(ln.val().length < 3){
			tip = $("#tiplname");
			
			$("#tiplname .tooltip-inner b").text("Ingrese su Primer Apellido");
			w = (tip.parent().width() / 2 - tip.width() / 2)+"px";
			tip.css("left", w).show();
			ln.css('background', "#fd972b30");
			isok = false;
		}
		else{
			ln.css('background', "#fff");
		}
		if(ph.val().length < 6){
			tip = $("#tipphone");
			
			$("#tipphone .tooltip-inner b").text("Ingrese un Número Valido");
			w = (tip.parent().width() / 2 - tip.width() / 2)+"px";
			tip.css("left", w).show();
			ph.css('background', "#fd972b30");
			isok = false;
		}
		else{
			ph.css('background', "#fff");
		}
		if(ad.val().length < 6){
			tip = $("#tipaddres");
			
			$("#tipaddres .tooltip-inner b").text("Debe Tener 6 o más Caracteres");
			w = (tip.parent().width() / 2 - tip.width() / 2)+"px";
			tip.css("left", w).show();
			ad.css('background', "#fd972b30");
			isok = false;
		}
		else{
			ad.css('background', "#fff");
		}
		
		if(!isok) return;

		$('form').submit();
	});
	
});
*/
function resolveHost(url) {
	// nombre del server (localhost o el nombre en produccion)
	var server = window.location.hostname + ":8000"; // aqui el puerto del backend
	return server + url;
} 