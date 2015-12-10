const sizes = {
  xxs: 320,
  xs: 480,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: Math.infinity,
};

export default class Responsive {
  static is(size) {
    return window.innerWidth <= sizes[size];
  }

  static isGt(size) {
    return window.innerWidth >= sizes[size];
  }
}
