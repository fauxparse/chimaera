---
to: src/components/<%= h.inflection.pluralize(type) %>/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.mdx
---
<% Name = h.changeCase.pascal(name) -%>
import { Canvas, Meta, Story, ArgTypes } from '@storybook/blocks';
import * as <%= Name %>Stories from './<%= Name %>.stories';

<Meta title="<%= h.inflection.capitalize(h.inflection.pluralize(type)) %>/<%= Name %>" of={<%= Name %>Stories} />

# <%= h.inflection.humanize(name) %>

<Canvas>
  <Story of={<%= Name %>Stories.Default} />
</Canvas>

<ArgsTable of={<%= Name %>Stories} />
