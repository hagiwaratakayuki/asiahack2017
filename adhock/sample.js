class A {
  get fuga() {
    return 'ok';
  }
}
class B extends A{
  get fuga() {
    return 'super is' + super.fuga;
  }
}

console.log(new B().fuga);
