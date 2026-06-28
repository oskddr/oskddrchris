import { onBeforeUnmount, watch } from 'vue';

export function useAutoCloseMenu(menuOpen, delay = 3000) {
  let closeTimer = null;

  const clearMenuClose = () => {
    if (!closeTimer) return;
    window.clearTimeout(closeTimer);
    closeTimer = null;
  };

  const scheduleMenuClose = () => {
    clearMenuClose();
    if (!menuOpen.value) return;
    closeTimer = window.setTimeout(() => {
      menuOpen.value = false;
      closeTimer = null;
    }, delay);
  };

  const closeMenu = () => {
    clearMenuClose();
    menuOpen.value = false;
  };

  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
    if (menuOpen.value) scheduleMenuClose();
  };

  watch(menuOpen, (isOpen) => {
    if (isOpen) scheduleMenuClose();
    else clearMenuClose();
  });

  onBeforeUnmount(clearMenuClose);

  return {
    closeMenu,
    clearMenuClose,
    keepMenuOpen: scheduleMenuClose,
    scheduleMenuClose,
    toggleMenu,
  };
}
