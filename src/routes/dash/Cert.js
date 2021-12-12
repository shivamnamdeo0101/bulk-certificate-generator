import React from 'react'
import "./dash.css";
import sign from "./sign.PNG";
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";


function Cert() {

	

	const PrintPdf = () => {
	  	const divToDisplay = document.getElementById('content')
	  	console.log(divToDisplay);
		html2canvas(divToDisplay,{dpi:2000}).then(function(canvas) {
		    const imgData = canvas.toDataURL("image/png");
		    const pdf = new jsPDF({
	          orientation: 'landscape',
	        });
	        const imgProps= pdf.getImageProperties(imgData);
	        const pdfWidth = pdf.internal.pageSize.getWidth();
	        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
	        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
	        pdf.save('download.pdf');
		})
	}

	return (

		<div>


		<button onClick={()=>PrintPdf()}>Print</button>
		<div className="certificate" id="content">
			
			<div className="cert_head">
				<h2>Conversion <mark>XL</mark></h2>
				<h1>Certificate Of Completion</h1>

			</div>

			<div className="cert_main">
				<p>This is certify that</p>
				<h2>Shivam Namdeo</h2>
				<p>has successfully completed Google Analytics Course </p>
				<p>on March 8th 2022</p>
			</div>

			<div className="cert_sign">
				<img src={sign} alt="" />
				<p>Peep Laja, Principal</p>
			</div>

			
		</div>


		</div>
	)
}

export default Cert