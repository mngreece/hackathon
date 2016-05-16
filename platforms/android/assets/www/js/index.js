/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        var success = function() {
            console.log("addNdefListener success");
        };

        var failure = function(reason) {
            alert("addNdefListener failed " + reason);
        }

        nfc.addMimeTypeListener('text/pg', app.onNdef, success, failure);

    },
    onNdef: function(nfcEvent) {
        var tag = nfcEvent.tag,
            ndefMessage = tag.ndefMessage;

        var productCode = nfc.bytesToString(ndefMessage[0].payload).substring(0);

        navigator.vibrate(100);

        addToList(productCode);

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        console.log('Received Event: ' + id);
    }
};

app.initialize();

function addToList(pnum){

    if(!$('#product-'+pnum).length) {

        $.getJSON('http://clients.easymode.com.au/hackathon/'+pnum+'.json', function (data) {

                var ProductNumber = data.response.ProductNumber;
                var Title = data.response.Title;
                var Brand = data.response.Brand;
                var SubBrand = data.response.SubBrand;
                var Thumbnail = data.response.Thumbnail;
                var URLSegment = data.response.URLSegment;
                var ProductLink = "http://reece.com.au/bathrooms/products/"+URLSegment;
                var card = '<li class="swipeout" id="product-'+ProductNumber+'">'+
                                    '<div class="item-content swipeout-content">'+
                                '<div class="card ks-card-header-pic">'+
                                    '<div valign="bottom" style="color:#006690" class="card-header color-white no-border">'+Title+'</div>'+
                                        '<div class="card-content">'+
                                            '<div class="row no-gutter">'+
                                                '<div class="col-50"><img width="100%" src="'+Thumbnail+'" /></div>'+
                                                '<div class="col-50">'+
                                                    '<div class="card-content-inner">'+
                                                        '<p class="color-gray">ProductNumber: </br />'+ProductNumber+'</p>'+
                                                        '<p>Brand:<br /> '+Brand+' / '+SubBrand+'</p>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '<div class="card-footer"><a href="'+ProductLink+'" class="link">Read more</a></div>'+
                                '</div>'+
                                    '<div class="swipeout-actions-right"><a href="#" class="swipeout-delete">Delete</a></div>'+
                                  '</li>';

                $(".wishlist").prepend(card);
        });
    }
}