Documentação do trabalho - P2(Prova)


Para testar o trabalho feito utilizamos o Live Server, extensão do VScode, que pode ser usada que pode ser usado ao clicar com o botão direito no arquivo HTML na área de trabalho do VScode e clicar em "Open with Live Server".

Os cubos foram criados no arquivo "texturecube.js", onde são criados os vértices, cores, iluminação, as faces, rotação e textura.

Por meio do uso do ColorCube(), criamos os dois cubos, com suas posições, coordenadas de texturas e cores. Além disso, dentro do render(), foi feito o translation dos cubos, fazendo com que eles não se sobrepusessem. 

Para criar a rotação dos cubos, foi utilizado um vetor de 3 coordenadas(x,y,z), com o intuito de criar diferentes posicionamentos relativos aos eixos entre os cubos. Por fim, por meio do "theta[axis] += 0.02;" e do "theta1[axis] -= 0.05;", fizemos com que as figuras tivessem uma rotação sobre o eixo z, com cada um rotacionando para um lado distinto.

Em relação a textura, criamos o "tBuffer" para guardar os dados de textura alocados na função, onde com ele conseguimos criar dois cubos coloridos.

Finalmente, em relação a iluminação criamos o "lightPosition", o "lightAmbient" e o "materialShiness" com vetores de 4 coordenadas. Estes números foram utilizados sequencialmente no "gl.uniform4fv" e no "gl.uniform1f", onde a iluminação foi inserida de fato.
