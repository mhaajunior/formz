import { Fragment, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import { TiTick } from "react-icons/ti";
import $ from "jquery";
import JsPDF from "jspdf";
import html2canvas from "html2canvas";
import krut from "../images/krut.jpg";
import "../fonts/sarabun-normal";
import "./ApprovalForm.css";

const ApprovalForm = () => {
  const moneyArray = [
    "input16",
    "input17",
    "input18",
    "input20",
    "input21",
    "input23",
    "input24",
    "input26",
    "input27",
    "input29",
    "input30",
    "input40",
    "input44",
  ];
  const pdfRef = useRef(null);
  const [editMode, setEditMode] = useState(true);
  const [form, setForm] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
    input7: "",
    input8: "",
    input9: "",
    input10: "",
    input11: "",
    input12: "",
    input13: "",
    input14: "",
    input15: "",
    input16: "",
    input17: "",
    input18: "",
    input19: "",
    input20: "",
    input21: "",
    input22: "",
    input23: "",
    input24: "",
    input25: "",
    input26: "",
    input27: "",
    input28: "",
    input29: "",
    input30: "",
    input31: "",
    input32: "",
    input33: "",
    input34: "",
    input35: "",
    input36: "",
    input37: "",
    input38: "",
    input39: "",
    input40: "",
    input41: "",
    input42: "",
    input43: "",
    input44: "",
    input45: "",
    input46: "",
    input47: "",
    input48: "",
    input49: "",
    budget_type: "",
    approve: "",
  });
  const [condition, setCondition] = useState({
    con1: false,
    con2: false,
    con3: false,
    con4: false,
    con5: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const displayForm = (name, type, width, disabled = false, value) => {
    if (editMode) {
      if (type === "text") {
        return (
          <input
            onChange={handleChange}
            name={name}
            value={form[name]}
            type={type}
            style={{ width }}
            disabled={disabled}
          />
        );
      } else if (type === "radio") {
        return (
          <input
            onChange={handleChange}
            name={name}
            value={value}
            type={type}
            checked={showDefaultRadioSelect(name, value)}
          />
        );
      }
    } else {
      // $(".body").find("div").removeClass("disabled");
      if (type !== "text") {
        if (form[name] === value) {
          return <TiTick />;
        }
        return;
      }
      let result = "";
      const found = moneyArray.find((element) => element === name);
      if (found) {
        result = formatNumber(form[name]);
      } else {
        result = form[name];
      }

      return <span className="pr-10 pl-10">{result}</span>;
    }
  };

  const showDefaultRadioSelect = (name, value) => {
    if (form[name] === value) {
      return true;
    }
    return false;
  };

  const handleClick = () => {
    setEditMode(!editMode);
    window.scrollTo(0, 0);
  };

  const handleConCheck = (event) => {
    const { name } = event.target;
    if (event.target.checked) {
      setCondition({ ...condition, [name]: true });
    } else {
      setCondition({ ...condition, [name]: false });
    }
    if (condition[name]) {
      $(`.${name}1`).addClass("disabled");
      $(`.${name}2`).addClass("disabled");
      $(`.${name}1 input`).each(function () {
        $(this).attr("disabled", true);
      });
      $(`.${name}2 input`).each(function () {
        $(this).attr("disabled", true);
      });
    } else {
      $(`.${name}1`).removeClass("disabled");
      $(`.${name}2`).removeClass("disabled");
      $(`.${name}1 input`).each(function () {
        $(this).attr("disabled", false);
      });
      $(`.${name}2 input`).each(function () {
        $(this).attr("disabled", false);
      });
    }
  };

  const renderConCheckbox = (name) => {
    if (editMode) {
      // if (!condition[name]) {
      //   $(`.${name}1`).addClass("disabled");
      //   $(`.${name}2`).addClass("disabled");
      // }
      return (
        <input
          onChange={handleConCheck}
          name={name}
          type="checkbox"
          checked={condition[name]}
        />
      );
    } else {
      if (condition[name]) {
        return <TiTick />;
      }
      return;
    }
  };

  const formatNumber = (num) => {
    const numberFormatter = Intl.NumberFormat("en-US");
    if (num) {
      return numberFormatter.format(parseInt(num));
    }
    return "";
  };

  const generatePDF = () => {
    const content = pdfRef.current;

    html2canvas(content).then(function (canvas) {
      const img = canvas.toDataURL("image/png");
      const doc = new JsPDF("p", "pt", "a4");
      const timestamp = Date.now();
      doc.setFont("sarabun");
      doc.addImage(img, "JPEG", 25, 10, 550, 850);
      doc.save(`approval_${timestamp}.pdf`);
    });
  };

  return (
    <>
      <div ref={pdfRef} className="form-container">
        <div className="header">
          <img src={krut} alt="" />
          <h1>บันทึกข้อความ</h1>
        </div>
        <div className="mt-20">
          <p>
            <b className="pr-30">ส่วนราชการ</b>มหาวิทยาลัย
          </p>
          <p>
            <b className="pr-10">ที่</b>
            {displayForm("input1", "text", "13rem")}
            <b>วันที่</b>
            {displayForm("input2", "text", "3rem")}
            <span>เดือน</span>
            {displayForm("input3", "text", "6rem")}
            <span>พ.ศ.</span>
            {displayForm("input4", "text", "4rem")}
          </p>
          <p>
            <b className="pr-30">เรื่อง</b>ขออนุมัติค่าใช้จ่ายจัดการประกวด
            แข่งขัน
          </p>
          <p>
            <b className="pr-30">เรียน</b>อธิการบดีมหาวิทยาลัย
          </p>
        </div>
        <div>
          <p>
            <span className="tab"></span>ตามที่หน่วยงาน{" "}
            {displayForm("input5", "text", "12rem")} ได้รับอนุมัติโครงการ{" "}
            {displayForm("input6", "text", "14rem")} ซึ่งจะจัดระหว่างวันที่{" "}
            {displayForm("input7", "text", "12rem")}
            ถึงวันที่ {displayForm("input8", "text", "12rem")} แล้วนั้น
            (หน่วยงาน) {displayForm("input9", "text", "12rem")}{" "}
            ขออนุมัติเบิกค่าใช้จ่ายในการดำเนินการดังนี้
          </p>
          <div>
            <div className="grid-wrap">
              <div>({renderConCheckbox("con1")})</div>
              <div className="flex con11 disabled">
                <div style={{ width: "35%" }}>1. ค่ารางวัล (ค่าใช้สอย)</div>
                <div>
                  <div>
                    1.1 รางวัลที่{" "}
                    {displayForm("input10", "text", "2rem", !condition.con1)}{" "}
                    จำนวน{" "}
                    {displayForm("input11", "text", "2rem", !condition.con1)}{" "}
                    รางวัล
                  </div>
                  <div>
                    1.2 รางวัลที่{" "}
                    {displayForm("input12", "text", "2rem", !condition.con1)}{" "}
                    จำนวน{" "}
                    {displayForm("input13", "text", "2rem", !condition.con1)}{" "}
                    รางวัล
                  </div>
                  <div>
                    1.3 รางวัลที่{" "}
                    {displayForm("input14", "text", "2rem", !condition.con1)}{" "}
                    จำนวน{" "}
                    {displayForm("input15", "text", "2rem", !condition.con1)}{" "}
                    รางวัล
                  </div>
                </div>
              </div>
              <div className="flex sub con12 disabled">
                <div>
                  เป็นเงิน{" "}
                  {displayForm("input16", "text", "4rem", !condition.con1)} บาท
                </div>
                <div>
                  เป็นเงิน{" "}
                  {displayForm("input17", "text", "4rem", !condition.con1)} บาท
                </div>
                <div>
                  เป็นเงิน{" "}
                  {displayForm("input18", "text", "4rem", !condition.con1)} บาท
                </div>
              </div>
              <div>({renderConCheckbox("con2")})</div>
              <div className="con21 disabled">
                2. ค่าตอบแทนกรรมการผู้ทรงคุณวุติจากภายนอกรวม{" "}
                {displayForm("input19", "text", "2rem", !condition.con2)} คน
                เป็นเงิน{" "}
                {displayForm("input20", "text", "4rem", !condition.con2)} บาท
                (ตามรายชื่อที่แนบ)
              </div>
              <div className="con22 disabled">
                อัตราคนละ{" "}
                {displayForm("input21", "text", "4rem", !condition.con2)} บาท
              </div>
              <div>({renderConCheckbox("con3")})</div>
              <div className="con31 disabled">
                3. ค่าสมนาคุณกรรมการดำเนินงานจากภายนอกมหาวิทยาลัย รวม{" "}
                {displayForm("input22", "text", "2rem", !condition.con3)} คน
                เป็นเงินหมวดค่าตอบแทน{" "}
                {displayForm("input23", "text", "4rem", !condition.con3)} บาท
                (ตามรายชื่อที่แนบ)
              </div>
              <div className="con32 disabled">
                อัตราคนละ{" "}
                {displayForm("input24", "text", "4rem", !condition.con3)} บาท
              </div>
              <div>({renderConCheckbox("con4")})</div>
              <div className="con41 disabled">
                4. ค่าใช้จ่ายการเดินทางของกรรมการตัดสิน กรรมการดำเนินการ รวม{" "}
                {displayForm("input25", "text", "2rem", !condition.con4)} คน
                เป็นเงินหมวดค่าตอบแทน{" "}
                {displayForm("input26", "text", "4rem", !condition.con4)} บาท
                (ตามรายชื่อที่แนบ)
              </div>
              <div className="con42 disabled">
                อัตราคนละ{" "}
                {displayForm("input27", "text", "4rem", !condition.con4)} บาท
              </div>
              <div>({renderConCheckbox("con5")})</div>
              <div className="con51 disabled">
                5. ค่าเบี้ยประชุม/ค่าตอบแทน กรรมการตัดสินหรือกรรมการดำเนินการ
                รวม {displayForm("input28", "text", "2rem", !condition.con5)} คน
                เป็นเงินหมวดค่าตอบแทน{" "}
                {displayForm("input29", "text", "4rem", !condition.con5)} บาท
                (ตามรายชื่อที่แนบ)
              </div>
              <div className="con52 disabled">
                อัตราคนละ{" "}
                {displayForm("input30", "text", "4rem", !condition.con5)} บาท
              </div>
            </div>
          </div>
          <div>
            โดยขอเบิกค่าใช้จ่ายจาก (หน่วยงาน){" "}
            {displayForm("input31", "text", "14rem")}
          </div>
          <div>
            ประเภทงบประมาณ (
            {displayForm("budget_type", "radio", null, null, "1")})
            งบประมาณแผ่นดิน (
            {displayForm("budget_type", "radio", null, null, "2")}) บ.กศ. (
            {displayForm("budget_type", "radio", null, null, "3")}) กศ.บป. (
            {displayForm("budget_type", "radio", null, null, "4")}) กศ.นบ. (
            {displayForm("budget_type", "radio", null, null, "5")}) บัณฑิตศึกษา
          </div>
          <div className="flex">
            <div className="w-50">
              แผนงาน {displayForm("input32", "text", "calc(100% - 7em)")}
            </div>
            <div className="w-50">
              ผลผลิต {displayForm("input33", "text", "calc(100% - 7em)")}
            </div>
          </div>
          <div className="flex">
            <div className="w-50">
              กิจกรรมหลัก {displayForm("input34", "text", "calc(100% - 9em)")}
            </div>
            <div className="w-50">
              รหัสกิจกรรมหลัก{" "}
              {displayForm("input35", "text", "calc(100% - 12em)")}
            </div>
          </div>
          <div className="flex">
            <div className="w-50">
              กิจกรรมย่อย {displayForm("input36", "text", "calc(100% - 9em)")}
            </div>
            <div className="w-50">
              รหัสกิจกรรมย่อย{" "}
              {displayForm("input37", "text", "calc(100% - 12em)")}
            </div>
          </div>
          <div className="flex">
            <div className="w-50">
              รหัสงบประมาณ {displayForm("input38", "text", "calc(100% - 10em)")}
            </div>
            <div className="w-50">
              แหล่งของเงิน {displayForm("input39", "text", "calc(100% - 10em)")}
            </div>
          </div>
          <div>
            เป็นเงินทั้งสิ้น {displayForm("input40", "text", "14rem")} บาท (
            {displayForm("input41", "text", "17rem")})
          </div>
          <p>
            <span className="tab"></span>จึงเรียนมาเพื่อโปรดพิจารณาอนุมัติ
          </p>
          <div className="sign-box">
            <p>ลงชื่อ</p>
            <p>({displayForm("input42", "text", "10rem")})</p>
            <p>ตำแหน่ง {displayForm("input43", "text", "12rem")}</p>
          </div>
        </div>
        <div className="section">
          <p>
            ความเห็นหัวหน้าสำนักงานคณบดีคณะวิทยาศาสตร์และเทคโนโลยี
            ได้ตรวจสอบแล้วเป็นโครงการ/กิจกรรมที่ได้รับอนุมัติในแผนงบประมาณ
            และมีเงินเหลืออยู่ {displayForm("input44", "text", "4rem")} บาท
          </p>
          <div className="sign-box">
            <p>ลงชื่อ</p>
            <p>({displayForm("input45", "text", "10rem")})</p>
            <p>ตำแหน่ง หัวหน้าสำนักงานคณบดี</p>
          </div>
        </div>
        <div className="section">
          <div className="order">
            <p>การสั่งการ</p>
            <div>
              {displayForm("approve", "radio", null, null, "1")}
              อนุมัติ
            </div>
            <div>
              {displayForm("approve", "radio", null, null, "0")}
              ไม่อนุมัติ
            </div>
          </div>
          <div className="sign-box">
            <p>ลงชื่อ</p>
            <p>({displayForm("input46", "text", "10rem")})</p>
            <p>คณะบดีคณะวิทยาศาสตร์และเทคโนโลยี ปฎิบัติราชการแทน</p>
            <p>อธิการบดีมหาวิทยาลัย</p>
            <p>
              {displayForm("input47", "text", "3rem")}/
              {displayForm("input48", "text", "3rem")}/
              {displayForm("input49", "text", "3rem")}
            </p>
          </div>
        </div>
      </div>
      <div className="btn-container">
        {editMode ? (
          <Button variant="primary" onClick={handleClick}>
            Preview
          </Button>
        ) : (
          <Fragment>
            <Button variant="warning" onClick={handleClick}>
              Edit
            </Button>
            <Button variant="primary" onClick={generatePDF}>
              Save
            </Button>
          </Fragment>
        )}
      </div>
    </>
  );
};

export default ApprovalForm;
