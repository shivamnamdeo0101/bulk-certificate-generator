import React ,{useState}from 'react';
import "./editor.css";

import cert from "../../assets/cert.png";
import download from "../../assets/download.png";
import temp from "../../assets/temp.png";
import sheet from "../../assets/sheet.png";


import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import xlsx from "xlsx";


function Editor() {

	const [tmp_id, set_tmp_id] = useState("1");
	const [menu, set_menu] = useState("sheet");
	const [loading, set_loading] = useState(false);
	const [stu_list, set_stu_list] = useState([]);

	const readUploadFile = async (e) => {
	    e.preventDefault();
	    if (e.target.files) {
	        const reader = new FileReader();
	        reader.onload = (e) => {
	            const data = e.target.result;
	            const workbook = xlsx.read(data, { type: "array" });
	            const sheetName = workbook.SheetNames[0];
	            const worksheet = workbook.Sheets[sheetName];
	            const json = xlsx.utils.sheet_to_json(worksheet);
	            set_stu_list(json);
	           	
	            console.log(stu_list)

	        };
	        reader.readAsArrayBuffer(e.target.files[0]);
	    }
	}
	return (
		<div className="editor">
				
			<div className="editor_head">
				<img src={cert} alt="" />
				<h2>Bulk Certificate Generator</h2>
				<img src={download} alt="" />
			</div>

			<div className="editor_grid">

				<div className="left_div_icon_list">	

					<img src={temp} alt="" onClick={()=>set_menu("temp")} />
					<img src={sheet} alt="" onClick={()=>set_menu("sheet")}/>

				</div>

				{
					menu == "temp" &&
					<div className="middle_div_icon_list">	

						<img onClick={()=>set_tmp_id("1")} className={tmp_id == 1 ? "border_blue" : "border_black"} src="https://static.vecteezy.com/system/resources/previews/003/144/724/non_2x/creative-modern-certificate-template-design-free-vector.jpg" alt=""/>
						<img onClick={()=>set_tmp_id("2")} className={tmp_id == 2 ? "border_blue" : "border_black"}src="https://www.creativefabrica.com/wp-content/uploads/2020/07/04/Modern-certificate-of-appreciation-Graphics-4542129-1-1-580x387.jpg" alt=""/>
						<img onClick={()=>set_tmp_id("3")} className={tmp_id == 3 ? "border_blue" : "border_black"}src="https://image.freepik.com/free-vector/gradient-modern-certificate-template_52683-65506.jpg" alt="" />
						<img onClick={()=>set_tmp_id("4")} className={tmp_id == 4 ? "border_blue" : "border_black"}src="https://image.freepik.com/free-vector/gradient-modern-certificate-template_52683-65506.jpg" alt="" />
					</div>
				}
				{
					menu == "sheet" &&
					<div className="middle_div_icon_list">	

						<div className="upload_input">	
							<label for="upload">Select Excel File:</label>
					    	<input type="file" name="upload" id="accept"accept="xlsx/*" onChange={readUploadFile} />
						</div>	

					 	<div className="stu_list">
					    	{
					    		stu_list.map((item,index)=>(
					    			<div className="stu_list_comp" key={index}>
					    				<p>{index+1}</p>
					    				<p>First Name : {item.f_name}</p>
					    				<p>Last Name : {item.l_name}</p>
					    				<p>Email : {item.email}</p>
					    			</div>
					    		))
					    	}
					    	
					    </div>
					        
					        

					
					</div>
				}

				

				<div className="editor_white_board">

				</div>

			</div>
			

		</div>
	)
}

export default Editor