<script>
  import { onMount, onDestroy } from "svelte";

  let canvasElement;
  let ctx;
  let m_canvasElement;
  let m_ctx;

  function onWindowResize() {
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;
  }

  function render() {
    if (!ctx) {
      return;
    }

    clear(ctx);

    ctx.fillRect(100, 100, 100, 100);
    ctx.fillRect(400, 100, 100, 100);
    ctx.fillRect(100, 600, 100, 100);
    ctx.fillRect(900, 600, 200, 100);

    requestAnimationFrame(render);
  }

  onMount(() => {
    // Register event listeners
    window.onresize = onWindowResize;

    // Init
    ctx = canvasElement.getContext("2d");
    m_canvasElement = document.createElement('canvas');
    m_ctx = m_canvasElement.getContext('2d');
    onWindowResize();


    render();
  });

  onDestroy(() => {
     window.onresize = null;
  });


  /* Canvas helper functions */
  function clear(ctx) {
    ctx.clearRect(0,0, window.innerWidth, window.innerHeight);
  }
</script>

<style>
  canvas {
    border: 1px solid black;
    box-sizing: border-box;
    overflow: auto;
    padding: 0;
    margin: 0;
  }
</style>

<canvas bind:this={canvasElement} />
