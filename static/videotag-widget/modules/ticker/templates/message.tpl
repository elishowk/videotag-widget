<span class="avatar"><img src="" alt="" /></span>
<span class="username"><%= _.escape(user.get('username')) %></span>
<span class="text">
    <span class="reference" data-reference="<%= _.escape(model.get('reference')) %>"><%= Format.hhmmss(model.get('reference')) %></span>
    <span class="content"><%= _.escape(model.getMetaData('text')) %></span>
</span>
