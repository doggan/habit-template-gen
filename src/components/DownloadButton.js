import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useState } from "react";

const pxToMm = (px) => {
  return Math.floor(px / document.getElementById("myMm").offsetHeight);
};

const mmToPx = (mm) => {
  return document.getElementById("myMm").offsetHeight * mm;
};

const range = (start, end) => {
  return Array(end - start)
    .join(0)
    .split(0)
    .map(function (val, id) {
      return id + start;
    });
};

// TODO(shyam):
// - this is likely broken for > 4 months worth of tables (need to support multiple pages)
// - this is likely broken for different screen resolutions or browser size configurations.. needs more testing.
const DownloadButton = ({ refRenderRoot }) => {
  const [loading, setLoading] = useState(false);

  const onClickDownload = () => {
    setLoading(true);

    // Ref: https://medium.com/@shivekkhurana/how-to-create-pdfs-from-react-components-client-side-solution-7f506d9dfa6d
    const input = refRenderRoot.current;
    const inputHeightMm = pxToMm(input.offsetHeight);
    const a4WidthMm = 210;
    const a4HeightMm = 297;
    const a4HeightPx = mmToPx(a4HeightMm);
    const numPages =
      inputHeightMm <= a4HeightMm
        ? 1
        : Math.floor(inputHeightMm / a4HeightMm) + 1;
    console.log({
      input,
      inputHeightMm,
      a4HeightMm,
      a4HeightPx,
      numPages,
      range: range(0, numPages),
      comp: inputHeightMm <= a4HeightMm,
      inputHeightPx: input.offsetHeight,
      inputWidthPx: input.offsetWidth,
    });

    html2canvas(input, {
      // Explicitly specify scroll values to avoid offsets being added
      // depending on user's scroll location.
      // Ref: https://github.com/eKoopmans/html2pdf.js/issues/175
      scrollX: 0,
      scrollY: 0,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", [a4HeightMm, a4WidthMm]);

      // Attempt to fit to the page using aspect ratio of the rendered div.
      const paddingMm = 10;
      const ar = input.offsetWidth / input.offsetHeight;
      var xwidth = pdf.internal.pageSize.getWidth() - paddingMm;
      var xheight = (pdf.internal.pageSize.getHeight() / ar) * 1.264583;
      pdf.addImage(
        imgData,
        "PNG",
        paddingMm * 0.5,
        paddingMm * 0.5,
        xwidth,
        xheight
      );

      pdf.save("result.pdf");

      setLoading(false);
    });
  };

  return (
    <div>
      {/*
    Getting pixel height in milimeters:
    https://stackoverflow.com/questions/7650413/pixel-to-mm-equation/27111621#27111621
  */}
      <div id="myMm" style={{ height: "1mm" }} />
      <button
        onClick={() => onClickDownload()}
        className={"ui primary button " + (loading ? "loading" : "")}
      >
        Download Template as PDF
      </button>
    </div>
  );
};

export default DownloadButton;
