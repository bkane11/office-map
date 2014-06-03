// !function(){
var app = {};

// L.Browser.mobile = true;
// app.offline = true;
app.testing = true;

// var start = 0, angle = 12.8;
// $('#mapStuff').rotate({animateTo:12.8});
// $('#mapStuff').rotate({
	// angle: start,
	// animateTo: angle,
	// easing: $.easing.easeInOutSine
// })

// $('#mapStuff').draggable({
// $('body').draggable({
  // drag: function(event, ui){
	// console.log(event,ui);
    // var rotateCSS = 'rotate(' + ui.position.left + 'deg)';

    // $(this).css({
      // '-moz-transform': rotateCSS,
      // '-webkit-transform': rotateCSS
    // });
  // }
// });


// $(document).ready(function() {
    // var geometryserver = 'http://54.241.159.188/cloudgis/rest/services/Utilities/Geometry/GeometryServer/';
    var agsDomain = 'http://10.21.4.27',
        rest = ':6080/arcgis/rest/services',
		restServiceURL = agsDomain + rest + 'Office_Map/Seventh_Floor/MapServer'
        esriAttribution = 'Tiles: &copy; Esri';
    var watchId, locationMarker;

	var floor7_info = [{"Last Name": "Last Name", "First Name": "First Name", "Extension": "Extension", "Snum": "Snum", "Department": "Department", "Photo": "Photo", "Card": "Card"}, {"Last Name": "Buchwald", "First Name": "Alexis", "Extension": 3197, "Snum": 703, "Department": "GIS", "Photo": "Alexis_Buchwald.jpg", "Card": "DataMerge14.jpg"}, {"Last Name": "Kubokawa", "First Name": "Ashleigh", "Extension": 1789, "Snum": 709, "Department": "GIS", "Photo": "Ashleigh_Kubokawa.jpg", "Card": "DataMerge15.jpg"}, {"Last Name": "Kane", "First Name": "Ben", "Extension": 3118, "Snum": 776, "Department": "GIS", "Photo": "ben_kane.jpg", "Card": "DataMerge16.jpg"}, {"Last Name": "Greer", "First Name": "Brian", "Extension": 3279, "Snum": 711, "Department": "GIS", "Photo": "Brian_Greer.JPG", "Card": "DataMerge17.jpg"}, {"Last Name": "Wright", "First Name": "Doug", "Extension": 3253, "Snum": 756, "Department": "GIS", "Photo": "DougWright.jpg", "Card": "DataMerge18.jpg"}, {"Last Name": "Popuch", "First Name": "Eli", "Extension": 1705, "Snum": 702, "Department": "GIS", "Photo": "eli_popuch.jpg", "Card": "DataMerge19.jpg"}, {"Last Name": "Bashir", "First Name": "Fozia", "Extension": 3142, "Snum": 705, "Department": "GIS", "Photo": "fozia_bashir.jpg", "Card": "DataMerge20.jpg"}, {"Last Name": "Parteno", "First Name": "Jessica", "Extension": 1752, "Snum": 714, "Department": "GIS", "Photo": "Jessie_Parteno.jpg", "Card": "DataMerge21.jpg"}, {"Last Name": "Abbors", "First Name": "Rose", "Extension": 3015, "Snum": 708, "Department": "GIS", "Photo": "rose_abbors.jpg", "Card": "DataMerge22.jpg"}, {"Last Name": "Lopes", "First Name": "Tomas", "Extension": 1734, "Snum": 749, "Department": "GIS", "Photo": "Tom_Lopes.jpg", "Card": "DataMerge23.jpg"}, {"Last Name": "Kirkendall", "First Name": "Whitney", "Extension": 1793, "Snum": 706, "Department": "GIS", "Photo": "whitney_kirkendall.jpg", "Card": "DataMerge24.jpg"}, {"Last Name": "Voge", "First Name": "Maianna", "Extension": 1760, "Snum": 712, "Department": "GIS", "Photo": "Maianna_Voge.jpg"}]
	
    $.support.cors = true;

    //disable selecting loading display
    var _preventDefault = function(evt) {
        evt.preventDefault();
    };
    $("#loading").bind("dragstart", _preventDefault).bind("selectstart", _preventDefault);

    function toggleTOC() {
        if(L.Browser.mobile){
            $('#basemap_container').fadeToggle();
        }
        
        // move the controls to the right positions
        $('.leaflet-left').stop().animate({
            left : parseInt($('.leaflet-left').css('left'), 0) < 249 ? 250 : 0
        }, 0);
        
        $('#controls').stop().delay(30).toggle('slide',{easing:'easeOutCubic', duration: 800});

        $('.toggleTOC').html() === "&lt;" ?
            ( $('.toggleTOC').html("&gt;"),  $('.controlSwitcher').addClass('switcherHidden') ) :
            ( $('.toggleTOC').html("&lt;"),  $('.controlSwitcher').removeClass('switcherHidden') )  ;
        
        
        // remove any existing controlsHint button
        $('.toggleTOC').hasClass('hint') ? $('.toggleTOC').removeClass('hint') : null;
    }
    
    function showAttributes(d){
		var content = $('<div></div>'), img;
		if(d.SNum!='' && d.SNum!=null){
			var src = floor7_info.filter(function(o){return o.Snum == d.SNum});
			src = src[0].Card || src[0].Photo;
			if(src){
				img = $('<img>').attr('src', 'images/' + src)
					.appendTo(content);
					}
		}else
		$.each(d, function(k, v) {
            if (k.split(".").length > 1 || k === "OBJECTID" || k === "SHAPE" || k === "Shape" || k === "GlobalID" || v === 'Null' || !v || k.indexOf('Shape')!=-1) {
                /*skip this field if it has a "." and/or because it is an esri only field and/or because the value is null*/
            } else{
                var attr = $('<p></p>');
                var lbl = '';
                var attrItem = '';
                $.each(k.split("_"), function() {
                    lbl += (" " + this);
                });
				
				// if (k == 'SNum' ){
					// var src = floor7_info.filter(function(o){return o.Snum == v});
					// src = src[0].Card || src[0].Photo;
					// if(src){
						// img = $('<img>').attr('src', 'images/' + src)
							// .appendTo(attr);
							// }
				// }else{
					attr
						.append('<span class="popupLine attrVal">' + v + '</span>');
						// .append('<span class="popupLine attrKey">' + lbl + '</span>')
					// if (count % 2 !== 0) {
						// attr.addClass('gray');
					// }
					// count += 1;
				// }
				content.append(attr);
            }
        });
			$('<span title="hide" class="infoCloser">x</span>').appendTo('#TOC').click(function(e){
				$('#controls').hide();
			});
			$('#TOC').empty()
				.append(
					$('<span title="hide" class="infoCloser">x</span>').appendTo('#TOC').click(function(e){
						$('#controls').hide();
					})
				)
				.append(content)
			$('#controls').show();
	}
    
	
    
    // var layerOrder = ['floor'],
    // overlayMaps = {
        // "floor" : floor
    // };
    
    // for(var o in overlayMaps){
        // (function(m){
            // var a = overlayMaps[m];
                // a.on('popupCreated', controlsHint);
                // // a.on('loaded', function(e){getLayer(this, layerOrder.indexOf(m))} )
        // })(o)
    // }
	
	// streets = new L.TileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        // attribution : esriAttribution,
        // zIndex : 1,
        // maxNativeZoom : 19,
        // maxZoom : 22
    // });
    
    // initlayers = [floor];


    // INITIATE MAP

    var map = app.map = new L.map('map', {
        center : new L.LatLng(30.0242, -141.19783),
        zoom : 15,
        maxZoom : 17,
		minZoom : 15,
        // layers : initlayers,
		zoomControl : false
    });   
	
	    //////  MAP LAYERS         
    floor = L.geoJson(floor, {
		// filter: function(d){
			// if([/* 'Street Label','Street',  */'Misc Label'].indexOf(d.properties.Layer)==-1)
				// return d
		// },
		style: function(d){
			var style ={weight : 1, opacity : 0.5, color : '#666', fillOpacity : 0.2, fillColor : 'transparent', stroke : true, fill:  true, className:  'hidden'};
			switch(d.properties.Layer){
				case 'Cubes': 
					style.className = 'cubes';
					style.fillColor = '#111';
					return style
				case 'Conference Rooms':
					style.className = 'conf';
					style.fillColor = 'rgb(0, 128, 0)';
					style.fillOpacity = 0.4;
					return style
				case 'Bathrooms':
					style.className = 'bathroom';
					style.fillColor = 'rgb(0, 72, 201)';
					style.fillOpacity = 0.4;
					return style
				case 'Print Room':
					style.className = 'printroom';
					style.fillColor = 'yellow';
					return style
					style.fillOpacity = 0.4;
				case 'Offices':
					style.className = 'office';
					style.fillColor = '#111';
					style.opacity = 0.7;
					style.fillOpacity = 0.4;
					return style
				case 'Elevators':
					style.className = 'elevator';
					style.fillColor = '#111';
					return style
				case 'Shared':
					style.className = 'shared';
					style.fillColor = 'rgb(128, 0, 128)';
					style.fillOpacity = 0.4;
					return style
				case 'Labs':
					style.className = 'labs';
					style.fillColor = 'rgb(114, 41, 23);';
					style.fillOpacity = 0.4;
					return style
				case 'Filler Spaces':
				case 'Kitchen':
				case 'Open Space':
				case 'Server Room':
				case 'Stairs' :
					style.className = 'fillerspaces';
					style.fillColor = '#fff';
					return style
				case 'Floor':
					style.className = 'floor';
					style.fillColor = '#fff';
					style.fillOpacity = 0.1;
					style.weight = 2;
					return style
				case 'Street':
					style.className = 'street';
					return style;
				case 'Misc Label' :
					// style.className = 'hidden';
					// return style;
				case 'Street Label':
					style.className = 'hidden';
					// style.className = 'streetlabel';
					return style;
			}
		},
		onEachFeature: function(d , f){
			if(['Street Label', 'Misc Label'].indexOf(d.properties.Layer)!=-1){
				var icon = L.divIcon({html: '<span>'+(d.properties.Label || 'label')+'</span>', className: 'markerLabel ' + (d.properties.className || '')});
				var marker = L.marker(f.getBounds().getCenter(), {icon:icon})
					.addTo(map);
				map.removeLayer(f);
			}else{
				var info = floor7_info.filter(function(o){return o.Snum == d.properties.SNum})[0] || {},
					name = '';
				if(info['First Name'] && info['Last Name']){
					name = '</br>' + info['First Name'] + ' ' + info['Last Name'];
					if(info['Department'])
						name += '</br>' + info['Department'];
				}
				
				f.on('click', function(e){
						var fun = function(a){
							if(a.layer!=f){
								f.setStyle({color: '#666', 'weight':1});
								floor.off('click', fun);
							}
						}
						f.setStyle({color: 'rgb(0, 191, 255)', 'weight':3})
						showAttributes(d.properties);
						floor.on('click', fun)
					})
					.on('mouseover', function(e){
						$('.tip').html(d.properties.Layer + (d.properties.SNum ? ' ' + d.properties.SNum : '') + name);
					}).on('mouseout', function(e){
						$('.tip').html('');
					}).on('add', function(e){
						if(['Street Label', 'Misc Label'].indexOf(d.properties.Layer)!=-1)
							map.removeLayer(f);
					})
			}
		}
	});
	map.addLayer(floor);
	
    function controlsHint(){
        if( $('#controls').css('display') == 'none' /*&& $('.expandArrow').length < 1*/){
        	!$('.toggleTOC').hasClass('hint') ? $('.toggleTOC').addClass('hint') : null;
        	return true
        }
        return false;
    }

    // create full extent button
    // globe like character: &#8860;
    var fullExtent = $('<div class="leaflet-control-zoom leaflet-bar leaflet-control"><a class="full-extent leaflet-bar-part leaflet-bar-part-top-and-bottom" href="#" title="Full Extent"></a></div>')
        .on('dblclick', L.DomEvent.stopPropagation)
        .on('click', L.DomEvent.stopPropagation)
        .on('click', L.DomEvent.preventDefault)
        .on('click', function() {
            map.setView(map.options.center, map.options.zoom);
        });

    // create toggleTOC button
    var tocToggle = $('<div class="leaflet-control-zoom leaflet-bar leaflet-control"><a class="toggleTOC leaflet-bar-part leaflet-bar-part-top-and-bottom" href="#" title="Toggle Table of Contents">&lt;</a></div>')
        .on('dblclick', L.DomEvent.stopPropagation)
        .on('click', L.DomEvent.stopPropagation)
        .on('click', L.DomEvent.preventDefault)
        .on('click', toggleTOC);
   
    $('.leaflet-top.leaflet-left').prepend(tocToggle);
    
    function processLegend(j, baseurl, layer, nativeID, index){
        if(typeof j == 'string')
            j = JSON.parse(j);
        if(navigator.onLine && !app.offline && j!=null && j!=undefined && j!='')
            localStorage.removeItem(baseurl + '_legend'),
            localStorage.setItem(baseurl + '_legend', JSON.stringify(j));
        
        var l = document.createElement('div');
        l.className = 'layerlegend';
        $.each(j.layers, function() {
            var lid = this.layerId;
            if(nativeID)
                if(lid!=nativeID)
                    return true              
            if (layer){           
                var displayLabel = layer.options.label;
                layer.legendjson = this.legend;
                var h = $('<div class="legendGroup"><span class="resultsLayerName">' + displayLabel + '</span></div>');
                var c = $('<img class="nocheck check"/>');
                $(h).prepend(c);
                h = $(h)[0];
                var ul = '<ul></ul>';
                ul = $(ul)[0]
                var lgi, thing;
                $.each(this.legend, function() {
                    lgi = '<li class="legendItem"><span><img class="legendImage" src="data:image/png;base64,' + this.imageData + '"/></span><span>' + this.label + '</span></li>';
                    thing = document.createElement('img');
                    thing.className = 'legendImage';
                    thing.src = 'data:image/png;base64,' + this.imageData;
                    lgi = $(lgi)[0];
                    $(ul).append(lgi);
                });
                $(h).append(ul);
                $(h).click(function() {
                    $(ul).stop().fadeToggle();
                    $(c).toggleClass('check');
                    !layer._hidden ? layer._hideVectors() : layer._showVectors();
                });
                $(l).append(h);
            }
        });
        
        $('#TOC').insertAt(l,index);
        // $('#TOC').append(l);
    }
    
    function getLayer(e, index){ 
        var baseurl = s = e.options.url.substring(0, e.options.url.length - 2),
            nativeID = e.options.url.split('/').reverse().filter(function(e){if(!isNaN(e))return e})[0];
        var url = baseurl + 'legend?f=pjson';
        var lsname = baseurl + '_legend',
            lsjson = localStorage.getItem(lsname);
            
        if(!lsjson && (navigator.onLine || !app.offline))
            $.ajax({
                url : url,
                success : function(d){processLegend(d, baseurl, e, nativeID, index)}
            });
        else
            processLegend(lsjson, baseurl, e, nativeID, index)
    }

    $('.closeParent').click(function() {
        $(this).parent().fadeOut();
    });

    // for switching back to the TOC in #controls
    $('li.TOC').click(function(){
    	$('#controls').append($('#TOC').parent()).trigger('autosize');
	});
    
    function autosize(){        
        wh = $(window).height();
        $('#controls').height(wh-45).find('.autosize').height(wh-100);
    }
    // autosize();
    
    $('#controls').on('autosize', function(){
        autosize();
        $('li.TOC').css('display', 'inline-block');
    });
	
    $(window).on('resize', function(e){
        autosize();
    });
    // end document.ready function
// }); 
// }();