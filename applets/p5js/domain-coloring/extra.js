/// Old version
  //JQuery for getting a link with equation to share
  function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return (false);
  }
  
  function update_expression() {
    let new_expression = $("#equation-input").val();
    input = new_expression;
    console.log(new_expression);
  }
  
  // When the user presses the button, show some copyable text
  // First I tried it with a base64 expression. 
  // Now I am tryin to show just the expression. I hope this works fine :)
  // To make it work, we need to trim the expression
  // Maybe later I will figure out
  function showLink() {
    let expression_base64 = btoa($('#equation-input').val());
    //let expression_base64 = $('#equation-input').val();
    let url = [location.protocol, '//', location.host, location.pathname].join('');
    url = url + "?expression=" + expression_base64;
    //url = url + "?expression=" + expression;
    $('#copyable-link').val(url);
    $('#link-container').show();
    $('#copyable-link').select();
  }
  $('#copyable-link').blur(function () {
    $('#link-container').hide();
  });
  
  // If the user already specified
  $(function () {
    let expression_base64 = getQueryVariable('expression');
    //let expression = getQueryVariable('expression');
    //console.log(expression_base64);
    if (expression_base64) {
      $('#equation-input').val(atob(expression_base64.replace('/', '')));
      //$('#equation-input').val(expression_base64.replace('/', ''));
    }
    //$('#equation-input').val(expression.replace('/', ''));
  });
  
  function trimN(s) {
    if (s.trim) {
      return s.trim();
    }
    return s.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }
  
  // Get things started.
  $('#equation-input').change(update_expression);
  $('#equation-input').change(resetParameters);
  $('#show-link').click(showLink);
  $(update_expression);


  //// New version

  //JQuery for getting a link with equation to share
  function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return (false);
  }
  
  function update_expression() {
    let new_expression = $("#equation-input").val();
    input = new_expression;
    console.log(new_expression);
  }
  
  // When the user presses the button, show some copyable text
  // First I tried it with a base64 expression. 
  // Now I am tryin to show just the expression. I hope this works fine :)
  // To make it work, we need to trim the expression
  // Maybe later I will figure out
  function showLink() {
    let expression_base64 = btoa($('#equation-input').val());
    //let expression_base64 = $('#equation-input').val();
    let url = [location.protocol, '//', location.host, location.pathname].join('');
    url = url + "?expression=" + atob(expression_base64);
    //url = url + "?expression=" + expression;
    $('#copyable-link').val(url);
    $('#link-container').show();
    $('#copyable-link').select();
  }
  $('#copyable-link').blur(function () {
    $('#link-container').hide();
  });
  
  // If the user already specified
  $(function () {
    let expression_base64 = trimN(getQueryVariable('expression'));
    //let expression = getQueryVariable('expression');
    //console.log(expression_base64);
    if (expression_base64) {
      //$('#equation-input').val(atob(expression_base64.replace('/', '')));
      $('#equation-input').val(decodeURIComponent(expression_base64));
    }
    //$('#equation-input').val(expression_64.replace('/', ''));
  });
  
  function trimN(s) {
    if (s.trim) {
      return s.trim();
    }
    return s.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }
  
  // Get things started.
  $('#equation-input').change(update_expression);
  $('#equation-input').change(resetParameters);
  $('#show-link').click(showLink);
  $(update_expression);