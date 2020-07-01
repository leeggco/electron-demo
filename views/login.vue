<template>
  <!-- 登陆页 -->
  <div class="login">
    <form class="form-signin">
      <img class="mb-4" src="https://v4.bootcss.com/docs/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Sign in</h1>
      <label for="inputEmail" class="sr-only">Username</label>
      <input type="text" id="inputEmail" class="form-control" placeholder="Username" required="" autofocus="">
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
      <button class="btn btn-lg btn-primary btn-block" type="submit" onclick="loginFn()">Sign in</button>
    </form>
  </div>
</template>

