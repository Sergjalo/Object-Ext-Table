	Qva.AddExtension('HTMLTable', function() {
  // Load our css file
  //Qva.LoadCSS("/QvAjaxZfc/QvsViewClient.aspx?public=only&name=Extensions/Objects/HTMLTable/style.css");
  Qva.LoadCSS(Qva.Remote + (Qva.Remote.indexOf('?') >= 0 ? '&' : '?') + 'public=only' + '&name=' + "Extensions/HTMLTable/style.css");
  //Qva.LoadCSS("c:/Users/Sergii_Kotov/AppData/Local/QlikTech/QlikView/Extensions/HTMLTable/style.css");
  //alert(Qva.Remote);
  var _this = this;

  // Headings
  var DimLabel = _this.Layout.Text0.text;
  var ExprLabel = _this.Layout.Text1.text;

  // prototype for a table row
  var headstring = "<tr class='myTable' name={2} ><th class='myTable'>{0}</th><th class='myTable' >{1}</th></tr>"
  var rowstring = "<tr><td class='myTableR' name={2} >{0}</td><td class='myTableR' name={2}>{1}</td></tr>";

  // Create a variable to hold generated html
  var html = "<table class='myTable'>";

  html += headstring.format(DimLabel, ExprLabel, -1);

  // Cycle Through the data
  for (var i = 0; i < _this.Data.Rows.length; i++) {
    // get the row
    var row = _this.Data.Rows [i];

    // Generate html
    html += rowstring.format(row[0].text, addCommas(row[1].text), i);
  }

  // Finalise the html
  html += "</table>";

  // Set the HTML
  _this.Element.innerHTML = html;
  
  //	$('.myTableR1').each(function(){alert($(this).attr("name"))});
  
  //$('.myTable').click(function () { alert(2);});
  
  //$('.myTableR1').click(function () { alert('dimension: ' + $(this).text()); });
  //$('.myTableR2').click(function () { alert('value: ' + $(this).text()); });
 // $('[class*="myTableHR"]').click(function () { alert('measure: ' + $(this).text()); });

  $('[class*="myTableR"]').click(function () {
	var i=$(this).attr("name");
	//alert (_this.Data.Rows [i][0].text ); 
	//_this.Data.SelectValuesInColumn(0,2, false); // third value in first dimension 
	//_this.Data.SelectTextsInColumn(0,true,'Z');  // value that equal to Z
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
    
  
 
},true);

String.prototype.format = function () {
  // code from stackoverflow.com
  var args = arguments;
  return this.replace(/\{(\d+)\}/g,
     function (m, n) { return args[n]; });
};

function addCommas(nStr)
{
  // function from mredkj.com
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
     x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}
