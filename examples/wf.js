function wfff(id){
  var svg_1 = id;//document.getElementById(id);
	var svg_2 = id;//document.getElementById(id);

	var Circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	Circle1.setAttribute("cx", 200);
	Circle1.setAttribute("cy", 200);
	Circle1.setAttribute("r", 50);
	Circle1.setAttribute("fill", "yellow");
	svg_1.appendChild(Circle1);

	var Circle2 = document.createElement("circle");
	Circle2.setAttribute("cx", 200);
	Circle2.setAttribute("cy", 200);
	Circle2.setAttribute("r", 50);
	Circle2.setAttribute("fill", "yellow");
	svg_2.appendChild(Circle2);
  return Circle1;

}
