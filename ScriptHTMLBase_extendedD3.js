var template_path = Qva.Remote + (Qva.Remote.indexOf('?') >= 0 ? '&' : '?')+ "public=only&name=Extensions/HTMLTable/";
Qva.LoadScript(template_path + "d3.min.js",extension_Done);

function extension_Done() {
  Qva.AddExtension('HTMLTable', function() {
  // Load our css file
  Qva.LoadCSS(template_path + "/style.css");
  var _this = this;

  // Headings
  var DimLabel = _this.Layout.Text0.text;
  var ExprLabel = _this.Layout.Text1.text;
	transform();
	
	function transform() {
		//add a unique name to the extension in order to prevent conflicts with other extensions.
		//basically, take the object ID and add it to a DIV
		var divName = _this.Layout.ObjectId.replace("\\", "_");
		if(_this.Element.children.length == 0) {//if this div doesn't already exist, create a unique div with the divName
			var ui = document.createElement("div");
			ui.setAttribute("id", divName);
			_this.Element.appendChild(ui);
		} else {
			//if it does exist, empty the div so we can fill it again
			$("#" + divName).empty();
		}
		var divMain = d3.select("#" + divName).append("table");
		divMain.append("thead");
		divMain.append("tbody");
		divMain.select("tbody").selectAll("tr").remove();

		var Rows =_this.Data.Rows;
		// Header
		var th = divMain.select("thead").selectAll("th")
			.data(['id','val'])
			.enter().append("th")
			.text(function(d) { return d; });
		// Rows
		var tr = divMain.select("tbody").selectAll("tr")
			.data(Rows)
			.enter().append("tr")
			.attr('name',function(d,i) { return i});			

		// Cells
		var td = tr.selectAll("td")
			.data(function(d) { 
				return d; 
			})
			.enter().append("td")
			.text(function(d) {
				return d.text; 
			})
			.attr('class','myTableR')
			.on('click',function(){
				var i=$(this).parent().attr("name");
					console.log("i="+i+" ("+_this.Data.Rows [i][0].text+")"); 
				_this.Data.SelectRow(i);
			})
			.on('mouseover',toggleM)
			.on('mouseout',toggleM);
			

		console.log("table loaded"); 
	}
	
	function toggleM(){
		$(this).toggleClass('stripes');
		$(this).siblings().toggleClass('stripes');
	}
  /*
  $('[class*="myTableR"]').click(function () {
	var i=$(this).parent().attr("name");
	//alert (_this.Data.Rows [i][0].text ); 
	//_this.Data.SelectValuesInColumn(0,2, false); // third value in first dimension 
	//_this.Data.SelectTextsInColumn(0,true,'Z');  // value that equal to Z
	console.log("i="+i+" ("+_this.Data.Rows [i][0].text+")"); 
	_this.Data.SelectRow(i);
  });
  
  
$('[class*="myTableR"]').mouseover(function () {
	$(this).siblings().toggleClass('stripes');
	$(this).toggleClass('stripes');
	
	//$(this).siblings().each(function(){alert($(this).text()+$(this).attr("name"))});
	//$(this).siblings().css();
  });

  $('[class*="myTableR"]').mouseout(function () {
	$(this).siblings().toggleClass('stripes');
	$(this).toggleClass('stripes');
  });
  */
  
 
 },true); //AddExtension
}