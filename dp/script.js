document.addEventListener('DOMContentLoaded', function() {
    const containers = document.querySelectorAll('.card-container');

    containers.forEach(container => {
        container.addEventListener('click', function(event) {
            if (event.target.classList.contains('card') && !event.target.classList.contains('add-card')) {
                if (container.id === 'skillContainer') {
                    event.target.classList.toggle('selected');
                } else {
                    const selected = container.querySelector('.selected');
                    if (selected) {
                        selected.classList.remove('selected');
                    }
                    event.target.classList.add('selected');
                }
            }
        });
    });

    document.getElementById('generatePrompt').addEventListener('click', function() {
        const role = document.querySelector('#roleContainer .selected')?.getAttribute('data-value') || '';
        const background = document.querySelector('#backgroundContainer .selected')?.getAttribute('data-value') || '';
        const skills = Array.from(document.querySelectorAll('#skillContainer .selected')).map(skill => skill.getAttribute('data-value')).join(', ') || '';
        const proficiency = document.querySelector('#proficiencyContainer .selected')?.getAttribute('data-value') || '';

        if (!role || !background || !skills || !proficiency) {
            alert('请确保每个栏目都有选择后再继续操作。');
            return;
        }

        const prompt = `你现在是一名${role}，你的背景是${background}，你拥有的技能包含${skills}，其中技能的熟练度是${proficiency}，请以此段内容展开，为我生成一段提示词，帮助我完成接下来的工作。`;

        document.getElementById('modalPrompt').textContent = prompt;
        document.getElementById('promptModal').style.display = 'block';
    });

    document.getElementById('copyButton').addEventListener('click', function() {
        const promptText = document.getElementById('modalPrompt').textContent;
        navigator.clipboard.writeText(promptText).then(() => {
            alert('提示词已复制到剪切板');
        }).catch(err => {
            console.error('无法复制文本: ', err);
        });
    });

    document.getElementById('confirmButton').addEventListener('click', function() {
        document.getElementById('promptModal').style.display = 'none';
    });
});

function addCustomItem(containerId) {
    const container = document.getElementById(containerId);
    const newItemValue = prompt("请输入自定义项的名称:");
    if (newItemValue) {
        const newCard = document.createElement('button');
        newCard.className = 'card';
        newCard.setAttribute('data-value', newItemValue);
        newCard.textContent = newItemValue;
        container.insertBefore(newCard, container.querySelector('.add-card'));
    }
}