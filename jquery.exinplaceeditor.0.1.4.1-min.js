(function(b){var a=function(f){var f=b(f),e=f[0];for(var d in e){(function(g){if(b.isFunction(e[g])){f[g]=(/^get[^a-z]/.test(g))?function(){return e[g].apply(e,arguments)}:function(){var h=arguments;f.each(function(i){var j=f[i];j[g].apply(j,h)});return f}}})(d)}return f};var c=function(h,g){var e=h.is(":hidden");if(e){h.show()}var d=g.apply(h,[h]);if(e){h.hide()}return d};b.ex=b.ex||{};b.ex.inPlaceEditor=function(d,e,f){var h=this,i=h.config=b.extend({},b.ex.inPlaceEditor.defaults,f);i.targets=e;i.target=i.targets.eq(d);i.index=d;if(i.directEdit){i.editLabel=false}i.tag=i.target.attr("tagName");if(/INPUT|TEXTAREA/.test(i.tag)){i.isTextarea=(i.tag=="TEXTAREA");i.editor=i.target;var g=i.directEdit?"a":"span";if(i.convertCR=="li"){if(!i.isTextarea){i.convertCR=b.ex.inPlaceEditor.defaults.convertCR}else{g="ul";i.htmlEditor=false;i.htmlEditorAutoConvertCR=true}}i.label=b("<"+g+"/>");if(g=="a"){i.label.attr("href","javascript:void(0)")}i.editor.before(i.label);i.label.html(h._INPUTtoHTML(i.editor.val()))}else{if(i.tag=="UL"){i.editorType="textarea";i.convertCR="li";i.htmlEditor=false;i.htmlEditorAutoConvertCR=true}i.isTextarea=(i.editorType=="textarea");i.label=i.target;i.editor=b("<"+i.editorType+"/>");i.label.after(i.editor.hide());i.editor.show().val(h._HTMLtoINPUT(i.label.html()));i.label.html(h._INPUTtoHTML(i.editor.val()));if(i.displayStyle=="auto"&&!i.isTextarea){i.displayStyle=i.target.css("display")}}if(i.displayStyle=="auto"){i.displayStyle=i.isTextarea?"block":"inline"}if(i.displayStyle=="inline"||!i.isTextarea){i.convertCR="br"}i.displayClass="ex-ipe-"+i.displayStyle;i.editor.addClass("ex-ipe-editor");i.label.addClass("ex-ipe-label");i.editors=i.editor.wrap('<span class="'+i.displayClass+'"></span>').parent();if(i.saveLabel||i.cancelLabel){i.saveTool=b('<span class="ex-ipe-save-tool"/>');if(i.saveLabel){i.saveTool.append(i.saveButton=b('<a class="ex-ipe-save ex-ipe-btn" href="#">'+i.saveLabel+"</a>"))}if(i.cancelLabel){i.saveTool.append(i.cancelButton=b('<a class="ex-ipe-cancel ex-ipe-btn" href="#">'+i.cancelLabel+"</a>"))}i.editors.append(i.saveTool)}i.labels=i.label.wrap('<span class="'+i.displayClass+'"></span>').parent();h._moveMargin(i.label,i.labels);if(i.editLabel){i.editTool=b('<span class="ex-ipe-edit-tool" style="text-align:'+i.editLabelAlign+'"/>');i.editTool.append(i.editButton=b('<a class="ex-ipe-edit" href="#">'+i.editLabel+"</a>"));i.labels.append(i.editTool)}i.msgbox=b('<div class="ex-ipe-msgbox"/>').appendTo("body");if(i.directEdit){i.label.bind("click.ex-ipe mousedown.ex-ipe",function(){h.showEditor({focus:true});return false});if(i.hoverSpot){i.label.hover(function(){i.label.addClass("ex-ipe-spot");setTimeout(function(){i.label.removeClass("ex-ipe-spot")},500)})}}i.editor.bind("keydown.ex-ipe",function(j){if(j.keyCode==i.escKey){h.cancel({focus:true});return false}else{if(!i.isTextarea&&j.keyCode==i.saveKey){h.save({focus:true});return false}}});if(i.editButton){i.editButton.bind("click.ex-ipe",function(){h.showEditor({focus:true});return false}).hover(function(){i.label.addClass("ex-ipe-spot")},function(){i.label.removeClass("ex-ipe-spot")})}if(i.saveButton){i.saveButton.bind("click.ex-ipe",function(){h.save({focus:true});return false})}if(i.cancelButton){i.cancelButton.bind("click.ex-ipe",function(){h.cancel({focus:true});return false})}h.hideEditor();i.oninit(h,h)};b.extend(b.ex.inPlaceEditor.prototype,{_focus:function(d){var e=this,f=e.config;setTimeout(function(){d.focus();if(f.dataSelect){d.select()}},10)},_moveMargin:function(g,f){var d=this,e=d.config;b.each(["top","right","bottom","left"],function(h,i){f.css("margin-"+i,g.css("margin-"+i));g.css("margin-"+i,0)})},_INPUTtoHTML:function(d,f){var e=this,g=e.config;var d=arguments.length?d:e.getValue();if(!g.htmlEditor){d=e.escHTML(d);if(g.convertCR=="br"){d=d.replace(/\n$/,"").replace(/\n/g,"<br/>")}else{if(g.convertCR=="p"){d=d.replace(/\n$/,"");d="<p>"+d.replace(/\n/ig,"</p><p>")+"</p>";d=d.replace(/<p><\/p>/ig,"")}else{if(g.convertCR=="li"){if(g.directEdit&&g.directEditLiLink){d='<li><a href="#">'+d.replace(/\n/g,'</a></li><li><a href="#">')+"</a></li>"}else{d="<li>"+d.replace(/\n/g,"</li><li>")+"</li>"}}}}}else{if(g.htmlEditorAutoConvertCR){if(g.convertCR=="br"){d=d.replace(/\n$/,"").replace(/\n/g,"<br/>");d=d.replace(/><br\/>/ig,">").replace(/<br\/></ig,"<")}else{if(g.convertCR=="p"){d=d.replace(/\n$/,"");d="%%%ps%%%"+d.replace(/\n/ig,"%%%pe%%%%%%ps%%%")+"%%%pe%%%";d=d.replace(/>%%%pe%%%/ig,">").replace(/%%%ps%%%</ig,"<");d=d.replace(/%%%pe%%%/ig,"</p>").replace(/%%%ps%%%/ig,"<p>")}}}}return !f?d==""?g.nulltext:d:d},_HTMLtoINPUT:function(d,g){var f=this,h=f.config;var d=arguments.length?d:f.getLabel().html();if(!h.htmlEditor){d=d.replace(/\n/ig,"");if(h.convertCR=="br"){d=d.replace(/<BR>/ig,"%%%CR%%%")}else{if(h.convertCR=="p"){d=d.replace(/<BR>/ig,"%%%CR%%%").replace(/<P>|\s<P>/ig,"").replace(/<\/P>/ig,"%%%CR%%%")}else{if(h.convertCR=="li"){d=d.replace(/\s*<LI>/ig,"").replace(/\<\/LI>\s*/ig,"%%%CR%%%").replace(/%%%CR%%%$/ig,"")}}}var e=b("<div/>").html(d);d=e.text().replace(/%%%CR%%%/ig,"\n");e.remove()}else{if(h.htmlEditorAutoConvertCR){d=d.replace(/\n/ig,"");if(h.convertCR=="br"){d=d.replace(/<BR>/ig,"\n")}else{if(h.convertCR=="p"){d=d.replace(/<BR>/ig,"\n").replace(/<P>|\s<P>/ig,"").replace(/<\/P>/ig,"\n")}}}}d=d.replace(/\n$/ig,"");return !g?d==h.nulltext?"":d:d},getTarget:function(){return this.config.target},getEditor:function(){return this.config.editor},getLabel:function(){return this.config.label},getValue:function(){var d=this,e=d.config;return d.trimText(e.editor.val())},getConvertValue:function(){var d=this,e=d.config;return d._INPUTtoHTML(d.getValue(),true)},showEditor:function(f){var e=this,h=e.config,d=f||{};h._prevValue=e.getValue();h.labels.hide();var g=function(){!d.callback||d.callback.apply(e,[e]);!d.focus||e._focus(h.editor)};if(h.effect&&h.displayStyle=="block"){h.editors.show(h.effect,g)}else{h.editors.show();g()}return e},hideEditor:function(f){var e=this,h=e.config,d=f||{};h.editors.hide();var g=function(){!d.callback||d.callback.apply(e,[e]);!d.focus||e._focus(h.label)};if(h.effect&&h.displayStyle=="block"){h.labels.show(h.effect,g)}else{h.labels.show();g()}return e},cancel:function(f){var e=this,g=e.config,d=f||{};if(g._prevValue!=undefined){g.editor.val(g._prevValue)}e.hideEditor(d);return e},save:function(f){var e=this,g=e.config,d=f||{};if(/undefined|true/.test(g.onsave.call(e,e))){e.commit(d)}return e},commit:function(f){var e=this,g=e.config,d=f||{};g.editor.val(e.getValue());g.label.html(e._INPUTtoHTML());e.hideEditor(d);return e},trimText:function(d){return d.replace(/^\n+|\n+$/g,"").replace(/^\s+|\s+$/g,"")},escHTML:function(d){return d.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},showMessage:function(g,h){var f=this,i=f.config,d=b.extend({hideTime:3000,callback:null,closeButton:false,className:"",showMethod:"slideDown"},h);var j,l,e;c(i.editor,function(m){j=m.offset();l=m.outerHeight();e=m.outerWidth()});i.msgbox[0].className="ex-ipe-msgbox "+d.className;i.msgbox.css(i.displayStyle=="block"?{top:j.top+l,left:j.left}:{top:j.top,left:j.left+e}).html("<span>"+g+"</span>");var k;if(d.closeButton){b('<a href="#" class="ex-ipe-err-close">'+d.closeButton+"</a>").appendTo(i.msgbox).click(function(){if(k){clearTimeout(k)}f.hideMessage(d);return false})}i.msgbox.hide()[d.showMethod]();if(d.hideTime){k=setTimeout(function(){f.hideMessage(d)},d.hideTime)}return f},hideMessage:function(f){var e=this,g=e.config,d=b.extend({callback:null,hideMethod:"slideUp"},f);g.msgbox[d.hideMethod]();if(d.callback){d.callback()}return e},saving:function(e){var d=this,f=d.config;f.editor.attr("disabled",true);f.saveTool.css("visibility","hidden");d.showMessage(e||f.savingMessage,{className:"ex-ipe-saving",showMethod:"show",hideTime:false});return d},saveComplete:function(){var d=this,e=d.config;d.hideMessage({hideMethod:"hide",callback:function(){e.editor.attr("disabled",false);e.saveTool.css("visibility","visible");d.commit()}});return d},saveError:function(e){var d=this,f=d.config;f.editor.attr("disabled",false);f.editor.focus();f.saveTool.css("visibility","hidden");d.showMessage(e||"error!",{closeButton:"OK",className:"ex-ipe-err",callback:function(){f.saveTool.css("visibility","visible")}});return d}});b.ex.inPlaceEditor.defaults={editorType:"input",htmlEditor:false,htmlEditorAutoConvertCR:true,displayStyle:"auto",saveLabel:"SAVE",cancelLabel:"CANCEL",directEdit:true,directEditLiLink:true,editLabel:"EDIT",editLabelAlign:"left",saveKey:13,escKey:27,convertCR:"br",nulltext:"(none)",savingMessage:"Saving...",hoverSpot:true,nowHover:false,dataSelect:false,effect:"fast",oninit:function(){},onsave:function(){}};b.fn.exInPlaceEditor=function(f){var d=this,e=[];d.each(function(g){var i=d.eq(g);var h=i.data("ex-in-place-editor")||new b.ex.inPlaceEditor(g,d,f);e.push(h);i.data("ex-in-place-editor",h)});return f&&f.api?a(e):d}})(jQuery);