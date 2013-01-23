<span class="avatar"><img src="http://www.gravatar.com/avatar/<%= _.escape(user.get('email')) %>.jpg?s=36&d=retro" alt="" /></span>
<span class="username"><%= _.escape(user.get('username')) %></span>
<span class="text">
    <span class="reference" data-reference="<%= _.escape(model.get('reference')) %>"><%= Format.hhmmss(model.get('reference')) %></span>
    <span class="content"><%= _.escape(model.getMetaData('text')) %></span>
</span>
