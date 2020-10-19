export function get_coordinates(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var top = Math.ceil(rect.top);
    var left = Math.ceil(rect.left);
    
    return {
        x: event.clientX - left,
        y: event.clientY - top
    }
}
