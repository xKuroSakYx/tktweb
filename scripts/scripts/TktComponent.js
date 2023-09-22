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
    el: "#msform",
    data: {
        linetype: "-",
        separador: '---',
        totMax: 348,
    },
    methods: {
        init: function(){
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
			//this.startNext(e);
			return this.startNext(e);
			var user = $('#twitterUsername').val();
			var url = new URL("https://telegrambottkt.onrender.com/telegram");//encodeURI('');

			json = {
				token: 'tktk9wv7I8UU26FGGhtsSyMgZv8caqygNgPVMrdDw02IZlnRhbK3s',
				username: user,
				group: 'thekeyoftrueTKT',
				type: 'broadcast'
			}
			//alert(user)
			//this.startNext(e);
			/*
			var settings = {
				'cache': false,
				'dataType': "JSON",
				"async": true,
				"crossDomain": true,
				"CORS": true,
				"contentType": 'application/x-www-form-urlencoded', 

				"url": url,
				"method": "POST",
				"xhrFields": {
					withCredentials: true
				},
				"secure": true,
				"headers": {
					'Access-Control-Allow-Origin': '*',
				},
				'Access-Control-Allow-Origin': '*',
				"success" : function(response){
					alert(response)
				},
				"error": function(error){
						alert('error error')
				}
			}
			*/
			//$.ajax(settings);
			
			$.ajax({
                url : url,
                data : json,
				contentType: "application/json",
				crossDomain: true,
				xhrFields: {
					withCredentials: true
				},
                method : 'POST', //en este caso
                dataType : 'JSON',
				
                success : function(response){
                       alert(response)
                },
                error: function(error){
                       alert('error error')
                }
        	});
			
			/*
			
			$.post(url, $(this).serialize(), function(data) {
  
				if (data.code == 200) {
					/*
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
				  
				 alert('isok')
				} else {
				  isok = false;
				  alert("not function")
				}
				if (!isok) return;
				startNext(elemt);
			  }, 'json');
			  
			  */
		},
		auth_telegram: function(e){
			var user = $('#twitterUsername').val();
			var url = new URL("https://telegrambottkt.onrender.com/telegram");//encodeURI('');

			json = {
				token: 'tktk9wv7I8UU26FGGhtsSyMgZv8caqygNgPVMrdDw02IZlnRhbK3s',
				username: user,
				group: 'TktPrueva',//'thekeyoftrueTKT',
				type: 'broadcast'
			}
			//alert(user)
			//this.startNext(e);
			/*
			var settings = {
				'cache': false,
				'dataType': "JSON",
				"async": true,
				"crossDomain": true,
				"CORS": true,
				"contentType": 'application/x-www-form-urlencoded', 

				"url": url,
				"method": "POST",
				"xhrFields": {
					withCredentials: true
				},
				"secure": true,
				"headers": {
					'Access-Control-Allow-Origin': '*',
				},
				'Access-Control-Allow-Origin': '*',
				"success" : function(response){
					alert(response)
				},
				"error": function(error){
						alert('error error')
				}
			}
			*/
			//$.ajax(settings);
			
			$.ajax({
                url : url,
                data : json,
				contentType: "application/json",
				crossDomain: true,
				xhrFields: {
					withCredentials: true
				},
                method : 'POST', //en este caso
                dataType : 'JSON',
				
                success : function(response){
                       alert(response)
                },
                error: function(error){
                       alert('error error')
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
		}
    },
    styles: `
		#msform {
			margin: 10px auto !important;
		}
		#progressbar {
			margin-bottom: 20px !important;
		}
		body {
			overflow-y: hidden;
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