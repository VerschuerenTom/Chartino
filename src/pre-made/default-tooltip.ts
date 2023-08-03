import { Dimensions, Tooltip, TooltipData } from "../index.mjs";

const tooltipCallback = (
    svg: d3.Selection<SVGElement, object, HTMLElement, any>,
    tooltipData: TooltipData,
    dimensions: Dimensions
): void => {
    svg.select(".default-chartino-tooltip").remove();
    const tooltipGroup = svg.append("g").attr("class", "default-chartino-tooltip").style("pointer-events", "none");
    tooltipData.forEach((tooltipData) => {
        tooltipGroup
            .append("circle")
            .attr("cx", tooltipData.pointX)
            .attr("cy", tooltipData.pointY)
            .attr("r", 5)
            .style("fill", tooltipData.color);
        tooltipGroup
            .append("rect")
            .attr("x", tooltipData.pointX + 10)
            .attr("y", tooltipData.pointY - 10)
            .attr("rx", 3)
            .attr("ry", 3)
            .attr("width", 50)
            .attr("height", 20)
            .style("fill", tooltipData.color);
        tooltipGroup
            .append("text")
            .attr("x", tooltipData.pointX + 16)
            .attr("y", tooltipData.pointY + 5)
            .text(tooltipData.value)
            .style("fill", "white");
        tooltipGroup
            .append("line")
            .attr("stroke", "#4D774EFF")
            .attr("x1", tooltipData.pointX)
            .attr("x2", tooltipData.pointX)
            .attr("y1", dimensions.offset.top)
            .attr("y2", dimensions.svgHeight - dimensions.offset.bottom);
        tooltipGroup
            .append("rect")
            .attr("x", tooltipData.pointX - 50)
            .attr("y", dimensions.svgHeight - dimensions.offset.bottom)
            .attr("width", 100)
            .attr("height", 18)
            .attr("rx", 3)
            .attr("ry", 3)
            .style("fill", "black");
        tooltipGroup
            .append("text")
            .attr("x", tooltipData.pointX - 45)
            .attr("y", dimensions.svgHeight - dimensions.offset.bottom + 12)
            .text(new Date(tooltipData.timestamp).toLocaleString("nl-be"))
            .style("fill", "white")
            .style("font-size", "11px")
            .style("font-weight", "500");
    });
};

export const DEFAULT_TOOLTIP = new Tooltip(tooltipCallback);
