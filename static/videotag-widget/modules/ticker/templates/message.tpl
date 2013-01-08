<span class="avatar"><img src="" alt="" /></span>
<span class="username"><%= Format.htmlentities(model.get('username')) %></span>
<span class="body">
    <span class="reference" data-reference="<%= Format.htmlentities(model.get('reference')) %>"><%= Format.hhmmss(model.get('reference')) %></span>
    <span class="content"><%= Format.htmlentities(model.get('metadata').body) %></span>
</span>
