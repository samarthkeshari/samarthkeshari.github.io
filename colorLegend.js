export const colorLegend = (selection, props) => {
    const {
      colorScale,
      circleRadius,
      spacing,
      textOffset
    } = props;

    const groups = selection.selectAll('g')
      .data(colorScale.domain());
    const groupsEnter = groups
      .enter().append('g')
        .attr('class', 'tick');
    groupsEnter
      .merge(groups)
        .attr('transform', (d, i) =>
          `translate(0, ${i * spacing})`
        );
    groups.exit().remove();

    groupsEnter.append('circle')
      .merge(groups.select('circle'))
        .attr('r', circleRadius)
        .attr('fill', colorScale);

    groupsEnter.append('text')
      .merge(groups.select('text'))
        .text(d => d)
        .attr('dy', '0.32em')
        .attr('x', textOffset);

    groupsEnter.on("click",d => {
        console.log(d);
        var selectedIndex = colorScale.domain().indexOf(d);
        var currentOpacity = document.querySelectorAll('.line-path1');
        for (let i = 0; i < currentOpacity.length; i++) {

            if (i===selectedIndex){ continue};
            currentOpacity[i].style.opacity = 0.2;
          };
        console.log(currentOpacity);
    });

  }