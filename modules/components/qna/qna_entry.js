import $            from 'jquery';
import React        from 'react';
import QNAPresenter from 'components/qna/qna_standalone_presenter';

$(()=> {
    $('[data-qnaFormId]').each((i, node)=> {
      const [qid, page] = node.getAttribute('data-qnaFormId').split('/'),
            component = new QNAPresenter(qid, page);
      React.render(React.createElement(component, {qid, page}), node);
    });
});
