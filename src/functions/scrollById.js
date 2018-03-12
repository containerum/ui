const scrollById = id => {
  if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
    const idElement = document.getElementById(id);
    if (idElement) {
      idElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
      });
    }
  }
};

export default scrollById;
