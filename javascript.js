/** JavaScript for catclicker premium */

/** attempt to add the octopus */
$(function(){

	var mainCat;
    var model = {
        init: function() {
	        this.cats = [
			{
				"name": "Mittens",
				"url": "cat.jpg",
				"counter": 0,
			},
			{
				"name": "Hello Kitty",
				"url": "hellokitty.jpg",
				"counter": 0,
			},
			{
				"name": "Felix",
				"url": "felix.jpg",
				"counter": 0,
			},
			{
				"name": "Garfield",
				"url": "garfield.jpg",
				"counter": 0,
			},
			{
				"name": "Tom",
				"url": "tom.jpg",
				"counter": 0,
			}
		];
        },
        getAllCats: function() {
            return this.cats;
        },

        getFirstCat: function(){
        	return this.cats[0];
        }
    };


    var octopus = {

        getCats: function() {
            return model.getAllCats();
        },
        getFirstCat: function(){
        	return model.getFirstCat();
        },

        init: function() {
            model.init();
            view1.init();
            view2.init();
            admin.init();
        },

        incrementCat: function(cat){
        	cat.counter++;
        },
        updateNewCat: function(catName, catUrl, catClick) {

            octopus.getCats().forEach(function(cat){
                if(cat.name == mainCat.name){
                    cat.name = catName;
                    cat.url = catUrl;
                    cat.counter = catClick;
                    mainCat = cat;
                }
            });
        }
    };

    var view1 = {
        init: function() {
            this.catList = $('#cat-list');
            view1.render();
        },
        render: function(){

            $("#cat-list").html("");
            octopus.getCats().forEach(function(cat){

            	// We're creating a DOM element for the number
			    var elemName = document.createElement('li');
			    elemName.textContent = cat.name;

				// ... and when we click, alert the value of `name`
			    elemName.addEventListener('click', (function(cat) {
			        return function() {
			        	view2.changeCat(cat);
			        };
			    })(cat));

			    $("#cat-list").prepend(elemName);

            });
        }
    };

    /** cat viewing panel*/
    var view2 = {
        init: function() {
        	this.catDisplay = $('#cat-display');
        	view2.render();
        },
        render: function(){

        	// We're creating a DOM element for the number
		    var elemName = document.createElement('img');

            var firstCat = octopus.getFirstCat();
            $("#cat-name").html(firstCat.name + "=");
			$("#cat-counter").html(firstCat.counter);

            elemName.src = firstCat.url;
            elemName.className = "cat-pic";

            //if the cat img is clicked, increment the counter
            elemName.addEventListener('click', (function(firstCat) {
		        return function() {
		        	octopus.incrementCat(firstCat);
		        	$("#cat-counter").html(firstCat.counter);
		        };
		    })(firstCat));

		    $("#cat-display").prepend(elemName);
            mainCat = firstCat;
        },

        changeCat: function(cat){

			$("#cat-display").html("");
			$("#cat-name").html(cat.name + "=");
			$("#cat-counter").html(cat.counter);

        	var elemName = document.createElement('img');
            elemName.src = cat.url;
            elemName.className = "cat-pic";

            elemName.addEventListener('click', (function(cat) {
		        return function() {
		        	octopus.incrementCat(cat);
		        	$("#cat-counter").html(cat.counter);
		        };
		    })(cat));

		    $("#cat-display").prepend(elemName);
            mainCat = cat;
            admin.render();
    	},
    };

    /** admin section **/
    var admin = {
        init: function(){
            admin.render();
        },

        render: function (){

            //clearing the past
            $("#admin-section").html(" ");

            //creating updateForm
            var form = document.createElement('div');
            form.id = "update-form";
            form.css = "display: none";

            // creating the admin button
            var adminBtn = document.createElement('button');
            adminBtn.textContent = "Admin";
            adminBtn.id = "admin-button";

            //when admin button is clicked, form is displayed while the admin button hides
            adminBtn.addEventListener('click', (function() {

                $("#update-form").css("display","inline-block");
                $("#admin-button").css("display","none");
            }));

            //creating the cat name input
            var htmlCatName = "<span> Cat Name </span>"
            var inputCatName = document.createElement('input');
            inputCatName.id = "cat-name-input";
            inputCatName.type = "text";
            inputCatName.value = mainCat.name;
            inputCatName.onInput = "updateCatName()";


            //creating the cat url input
            var htmlCatUrl = "<span> Cat Url </span>"
            var inputCatUrl = document.createElement('input');
            inputCatUrl.id = "cat-url-input";
            inputCatUrl.value = mainCat.url;
            inputCatUrl.type = "text";

            //creating the cat click input
            var htmlCatClicks = "<span> Number of Cat Clicks </span>";
            var inputCatClicks = document.createElement('input');
            inputCatClicks.id = "cat-clicks-input";
            inputCatClicks.value = mainCat.counter;
            inputCatClicks.type = "number";

            //creating the save button
            var saveBtn = document.createElement('button');
            saveBtn.textContent = "Save";
            saveBtn.addEventListener('click', (function() {
                admin.updateCat();
                $("#update-form").css("display","none");
                $("#admin-button").css("display","inline-block");
            }));

            //creating the Cancel button
            var cancelBtn = document.createElement('button');
            cancelBtn.textContent = "Cancel";

            // When cancel button is clicked, hide the update-form and display admin-button
            cancelBtn.addEventListener('click', (function() {
                $("#update-form").css("display","none");
                $("#admin-button").css("display","inline-block");
            }));

            //adding the all the buttons and input
            $("#admin-section").append(adminBtn);
            $("#admin-section").append(form);
            $("#update-form").css("display","none");
            $("#update-form").append(htmlCatName);
            $("#update-form").append(inputCatName);
            $("#update-form").append(htmlCatUrl);
            $("#update-form").append(inputCatUrl);
            $("#update-form").append(htmlCatClicks);
            $("#update-form").append(inputCatClicks);
            $("#update-form").append(saveBtn);
            $("#update-form").append(cancelBtn);
        },

        updateCat: function (){

            var catName = document.getElementById("cat-name-input").value;
            var catUrl = document.getElementById("cat-url-input").value;
            var catclick = document.getElementById("cat-clicks-input").value;

            octopus.updateNewCat(catName, catUrl, catclick);

            view1.render();
            view2.changeCat(mainCat);
            admin.render();
        }
    };

    octopus.init();

});
