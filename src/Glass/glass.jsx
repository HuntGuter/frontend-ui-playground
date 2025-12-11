import { useRef, useEffect } from "react";

const Glass = ({ containerRef }) => {
  const glassRef = useRef(null);

  const posX = useRef(0);
  const posY = useRef(0);

  const offsetX = useRef(0);
  const offsetY = useRef(0);

  const containerRectRef = useRef(null);
  const isDragging = useRef(false);

  const handleMouseDown = (e) => {
    isDragging.current = true;

    containerRectRef.current = containerRef.current.getBoundingClientRect();

    const glassRect = glassRef.current.getBoundingClientRect();

    offsetX.current = e.clientX - glassRect.left;
    offsetY.current = e.clientY - glassRect.top;

    posX.current = glassRect.left - containerRectRef.current.left;
    posY.current = glassRect.top - containerRectRef.current.top;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;

    glassRef.current.classList.add("dragging");

    const containerRect = containerRectRef.current;
    const glassRect = glassRef.current.getBoundingClientRect();

    let newX = e.clientX - containerRect.left - offsetX.current;
    let newY = e.clientY - containerRect.top - offsetY.current;

    // left
    if (newX < 0) newX = 0;

    // top
    if (newY < 0) newY = 0;

    // right
    if (newX > containerRect.width - glassRect.width) {
      newX = containerRect.width - glassRect.width;
    }

    // left
    if (newY > containerRect.height - glassRect.height) {
      newY = containerRect.height - glassRect.height;
    }

    posX.current = newX;
    posY.current = newY;

    glassRef.current.style.left = newX + "px";
    glassRef.current.style.top = newY + "px";
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    glassRef.current.classList.remove("dragging");
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="wrap">
    <h1>Glass Effect</h1>
    <div className='container' ref={containerRef}>
      <p className='text'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a aliquam quam. Nunc fermentum vel arcu in fermentum. Sed eget dapibus dui. Etiam in accumsan mauris, quis interdum quam. Cras lectus neque, elementum id dui sed, bibendum pulvinar augue. Donec sapien tortor, placerat ut velit ac, mattis vestibulum risus. Maecenas eget ex at lectus pharetra condimentum eget ac nunc.
        Integer eros erat, vehicula eget felis sit amet, viverra egestas elit. Praesent non feugiat arcu, in lacinia purus. Sed blandit, orci ac pellentesque pharetra, massa odio porttitor nibh, viverra ultricies nibh tellus in neque. Integer dignissim efficitur augue sed sodales. Maecenas cursus in ante nec mollis. Vivamus accumsan accumsan neque, non eleifend massa placerat sed. Aliquam tempus, neque sit amet malesuada efficitur, turpis risus lacinia nisi, quis tristique nisl enim vel elit. Nunc sagittis, mi ut aliquam tincidunt, risus tortor dignissim ex, sit amet posuere sem eros non arcu.
        In vel sapien sed sem scelerisque ullamcorper. Aenean sodales at lacus vitae convallis. Suspendisse eget varius tortor. Vestibulum pharetra porttitor urna eget pellentesque. Phasellus et nisl mauris. Vivamus ornare urna quis nunc accumsan pharetra. In maximus elit quis lacus sagittis elementum. Nullam nec sollicitudin mi. Mauris porttitor leo nec eros varius scelerisque.
      </p>
      <div
        className="glass"
        ref={glassRef}
        onMouseDown={handleMouseDown}
        style={{ left: 0, top: 0 }}
      />
    </div>
  </div>
  );
};

export default Glass;
