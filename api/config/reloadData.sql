-- Conect as adm_cspe before running script
USE mark;

DELETE FROM results;
DELETE FROM examContent;
DELETE FROM exams;
DELETE FROM questions;
DELETE FROM users;
DELETE FROM categories;
DELETE FROM timelog;
DELETE FROM instructions;

ALTER TABLE exams AUTO_INCREMENT = 1;
ALTER TABLE questions AUTO_INCREMENT = 1;
ALTER TABLE timelog AUTO_INCREMENT = 1;

INSERT INTO categories (name) VALUES ('General');
INSERT INTO categories (name) VALUES ('Conditionals');
INSERT INTO categories (name) VALUES ('Loops');
INSERT INTO categories (name) VALUES ('Functions');
INSERT INTO categories (name) VALUES ('Testing');


INSERT INTO users (id, firstName, lastName, uploadDate, examDate, examStartTime, examEndTime, isAdmin)
   VALUES ('aa123456', "Alexis", "Alonso", '2020-04-05', NULL, NULL, NULL, 0);
INSERT INTO users (id, firstName, lastName, uploadDate, examID, examTimeLimit, examDate, examStartTime, examEndTime, isAdmin)
   VALUES ('mf123456', 'Mark', 'Fuller', '2020-04-06', 1, 1, NULL, NULL, NULL, 0);
INSERT INTO users (id, firstName, lastName, uploadDate, examID, examDate, examStartTime, examEndTime, examScore, isAdmin)
   VALUES ('jd123456', 'John', 'Doe', '2020-04-06', 1, '2020-04-06', '2020-04-05 10:00:00', '2020-04-05 10:48:01', .85, 0);
INSERT INTO users (id, firstName, lastName, uploadDate, examID, examDate, examStartTime, examEndTime, examScore, isAdmin)
   VALUES ('lw123456', 'Li', 'Wang', '2020-04-06', 3, '2020-04-08', '2020-04-08 20:00:00', '2020-04-08 21:00:01', .4, 0);
INSERT INTO users (id, firstName, lastName, uploadDate, examID, examDate, examStartTime, examEndTime, examScore, isAdmin)
   VALUES ('rs123456', 'Royal', 'Smith', '2020-05-10', 3, '2020-05-20', '2020-05-20 09:00:00', NULL, NULL, 0);
INSERT INTO users (id, firstName, lastName, uploadDate, examDate, examStartTime, examEndTime, isAdmin)
   VALUES ('ag123456', "Arup", "Guha", '2020-04-08', NULL, NULL, NULL, 1);
INSERT INTO users (id, firstName, lastName, uploadDate, examDate, examStartTime, examEndTime, isAdmin)
   VALUES ('mh123456', "Mark", "Heinrich", '2020-04-09', NULL, NULL, NULL, 1);
INSERT INTO users (id, firstName, lastName, uploadDate, examDate, examStartTime, examEndTime, isAdmin)
   VALUES ('dp123456', "Danny", "Parsons", '2020-04-10', NULL, NULL, NULL, 0);
INSERT INTO users (id, firstName, lastName, uploadDate, examID, examDate, examStartTime, examEndTime, isAdmin)
   VALUES ('lg123456', "Lukas", "Getter", '2020-04-10', 2, NULL, NULL, NULL, 0);
INSERT INTO users (id, firstName, lastName, uploadDate, examID, examDate, examStartTime, examEndTime, isAdmin)
   VALUES ('dz123456', "Dunquan", "Zheng", '2020-04-11', 2, NULL, NULL, NULL, 0);

INSERT INTO questions (questionID, parentQuestion,stem, choiceA, choiceB, choiceC, 
                       choiceD, choiceE, answer, category, versioned) VALUES (
1, 1,
'<p>For the pseudo-program below, assume that variables a, b, c, and d hold integer values. <br><code>a = 40</code><br><code>b = a + 50</code><br><code>c = b + 10</code><br><code>d = a + c</code><br><code>print d</code><br><br>The output of the print statement will be:</p>',
'40',
'50',
'90',
'100',
'140',
'e',
'General',
1
);

INSERT INTO questions (questionID, parentQuestion,stem, choiceA, choiceB, choiceC, 
                       choiceD, choiceE, answer, category, versioned) VALUES (
2, 2,
'<p>For the pseudo-program below, assume that variables v, w, x, y and z hold integer values. (Remember that the result of an integer division is its quotient, which is an integer.) <br><code>x = -7</code><br><code>y = -6</code><br><code>v = 2 * x - y</code><br><code>w = v + y</code><br><code>z = w / x</code><br><code>print z</code><br><br>The output of the print statement will be:</p>',
'-7',
'-6',
'-13',
'-8',
'2',
'e',
'General',
0
);

INSERT INTO questions (questionID, parentQuestion,stem, choiceA, choiceB, choiceC, 
                       choiceD, choiceE, answer, category, versioned) VALUES (
3, 3,
'<p>For the pseudo-program below, assume that variables w, x, y and z hold integer values.<br><code>x = 5</code><br><code>y = 9</code><br><code>w = 8</code><br><code>z = w + x * y</code><br><code>print z</code><br><br>The output of the print statement will be:</p>',
'85',
'77',
'49',
'117',
'53',
'e',
'General',
0
);


INSERT INTO questions (questionID, parentQuestion,stem, choiceA, choiceB, choiceC, 
                       choiceD, choiceE, answer, category, versioned) VALUES (
4, 4,
'<p>For the pseudo-program below, assume that variables var1, var2, var3, var4, var5 and var6 hold Boolean values.<br><code>var1 = true</code><br><code>var2 = true</code><br><code>var3 = false</code><br><code>var4 = true</code><br><code>var5 = true</code><br><code>var6 = (var1 OR var2) AND (NOT(var3) OR var4) AND var5</code><br><code>print var6</code><br><br>The output of the print statement will be:</p>',
'False',
'True',
NULL,
NULL,
NULL,
'b',
'General',
0
);


INSERT INTO questions (questionID, parentQuestion,stem, choiceA, choiceB, choiceC, 
                       choiceD, choiceE, answer, category, versioned) VALUES (
5, 5,
'<p>For the pseudo-program below, assume that variables n1, n2, n3 and n4 hold integer values. Remember that the operator <code>mod</code> computes and returns the remainder of the integer division.<br><code>n1 = 20</code><br><code>n2 = 5</code><br><code>n3 = n1/n2</code><br><code>n4 = n1 mod n2</code><br><code>print n3, n4</code><br><br>The output of the print statement will be: (do not worry about the formatting of the output)</p>',
'20, 4',
'20, 0',
'4, 5',
'5, 4',
'4, 0',
'e',
'General',
0
);


INSERT INTO questions (questionID, parentQuestion,stem, choiceA, choiceB, choiceC, 
                       choiceD, choiceE, answer, category, versioned) VALUES (
6, 6,
'<p>For the pseudo-program below, assume that variables x and y hold integers.<br><code>x = 5</code><br><code>y = 5</code><br><code>if (x&gt;y) then print x</code><br><code>if (y&gt;x) then print y</code><br><br>The output of the print statement(s) will be:</p>',
'5',
'5, 5',
'(Code segment does not generate any output)',
NULL,
NULL,
'c',
'Conditionals',
0
);


INSERT INTO questions (questionID, parentQuestion,stem, choiceA, choiceB, choiceC, 
                       choiceD, choiceE, answer, category, versioned) VALUES (
7, 7,
'<p>For the pseudo-code program below, assume that variables x, y and z hold integers. <br><code>x = 10</code><br><code>y = 30</code><br><code>z = x + y</code><br><code>if (x&gt;y) then print z</code><br><code>if (y&gt;x) then print (z + x + y)</code><br><br>The output of the print statement will be:</p>',
'10',
'30',
'50',
'70',
'80',
'e',
'Conditionals',
0
);


INSERT INTO questions (questionID, parentQuestion,stem, choiceA, choiceB, choiceC, 
                       choiceD, choiceE, answer, category, versioned) VALUES (
8, 8,
'<p>Which statement below detects whether the value of integer variable x is between -3 and 4 (inclusive)?</p>',
'<p>(x &lt; -4) AND (x &lt; 5)</p>',
'<p>(x &gt; -3) OR (x &lt; -3)</p>',
'<p>(x &gt; -4) OR (x &lt; 5)</p>',
'<p>(x &gt; -3) OR (x &lt; 4)</p>',
'<p>(x &gt; -4) AND (x &lt; 5)</p>',
'e',
'Conditionals',
0
);


INSERT INTO questions (questionID, parentQuestion,stem, choiceA, choiceB, choiceC, 
                       choiceD, choiceE, answer, category, versioned) VALUES (
9, 9,
'<p>For the pseudo-program below, assume that variables a, b, c, d, e, f and g hold integer values. (Remember that the word <code>eq</code> is used to indicate the equality operator, which will return a Boolean value of <code>true</code> or <code>false</code>.)<br><code>a = 50</code><br><code>b = 20</code><br><code>c = 10</code><br><code>d = 0</code><br><code>e = 0</code><br><code>f = 0</code><br><code>g = 0</code><br><code>if (a eq b) then d = 100</code><br><code>else if (b &gt; c) then e = 120</code><br><code>else if (c &gt; a) then f = 200</code><br><code>else if ((a+b) eq c) then g = 250</code><br><code>print d, e, f, g</code><br><br>The output of the print statement will be:</p>',
'100, 120, 0, 0',
'0, 0, 0, 0',
'0,  120,  200,  0',
'100,  120,  0,  250',
'0,  120,  0,  0',
'e',
'Conditionals',
0
);


INSERT INTO questions (questionID, parentQuestion,stem, choiceA, choiceB, choiceC, 
                       choiceD, choiceE, answer, category, versioned) VALUES (
10, 10,
'<p>For the pseudo-program below, assume that variables x and y hold integers:<br><code>x = 0</code><br><code>y = 0</code><br><code>while (y &lt; 80)</code><br><code>&nbsp;&nbsp;&nbsp;y = y + 1</code><br><code>&nbsp;&nbsp;&nbsp;x = y</code><br><code>print x</code><br><br>The output of the print statement will be:</p>',
'0',
'79',
'81',
'(Nothing, the code Does not generate any output)',
'80',
'e',
'Loops',
0
);


INSERT INTO questions (questionID, parentQuestion,stem, choiceA, choiceB, choiceC, 
                       choiceD, choiceE, answer, category, versioned) VALUES (
11, 11,
'<p>For the pseudo-program below, assume that variables k, n and p hold integer values.<br><code>k = 4</code><br><code>n = 0</code><br><code>p = 0</code><br><code>while (n &lt; 10)</code><br><code>&nbsp;&nbsp;&nbsp;p = p + k</code><br><code>&nbsp;&nbsp;&nbsp;n = n + 1</code><br><code>print p</code><br><br>The output of the print statement will be:</p>',
'0',
'44',
'32',
'36',
'40',
'e',
'Loops',
0
);


INSERT INTO questions (questionID, parentQuestion,stem, choiceA, choiceB, choiceC, 
                       choiceD, choiceE, answer, category, versioned) VALUES (
12, 12,
'<p>For the pseudo-program below, assume that variables n1 and n2 hold integer values. (Note that <code>mod</code> computes and returns the remainder of the integer division.)<br><code>n1 = 0</code><br><code>n2 = 0</code><br><code>while (n1 &lt; 10)</code><br><code>&nbsp;&nbsp;&nbsp;if ((n1 mod 2) eq 0) then n2 = n2 + n1</code><br><code>&nbsp;&nbsp;&nbsp;n1 = n1 + 1</code><br><code>print n2</code><br><br>The output of the print statement will be:</p>',
'5',
'10',
'16',
'25',
'20',
'e',
'Loops',
0
);


INSERT INTO questions (questionID, parentQuestion,stem, choiceA, choiceB, choiceC, 
                       choiceD, choiceE, answer, category, versioned) VALUES (
13, 13,
'<p>For the pseudo-program below, assume that variables a and b hold integers.<br><code>a = 1</code><br><code>b = 0</code><br><code>while (a &lt; 19)</code><br><code>&nbsp;&nbsp;&nbsp;a = a + 2</code><br><code>&nbsp;&nbsp;&nbsp;b = b + 1</code><br><code>print b</code><br><br>The output of the print statement will be:</p>',
'0',
'19',
'10',
'8',
'9',
'e',
'Loops',
0
);


INSERT INTO questions (questionID, parentQuestion,stem, choiceA, choiceB, choiceC, 
                       choiceD, choiceE, answer, category, versioned) VALUES (
14, 14,
'<p>For the pseudo-program below, assume that variables x, y and z hold integers:<br><code>x = 0</code><br><code>y = 2</code><br><code>z = 0</code><br><code>while (z  &lt;  55)</code><br><code>&nbsp;&nbsp;&nbsp;if (z &lt; 16) then x = x + 1</code><br><code>&nbsp;&nbsp;&nbsp;else y = y + (x + x mod 2)</code><br><code>&nbsp;&nbsp;&nbsp;z = z + 1</code><br><br>Within the while loop segment of the code, how often is y assigned an even integer?</p>',
'Variable y will be never assigned an even integer.',
'Variable y will be assigned an even integer sometimes, but not always.',
'Variable y will always be assigned an even integer.',
NULL,
NULL,
'c',
'Loops',
0
);


INSERT INTO questions (questionID, parentQuestion,stem, choiceA, choiceB, choiceC, 
                       choiceD, choiceE, answer, category, versioned) VALUES (
15, 15,
'<p>For the pseudo-code program below, assume that an array named <tt>my_array</tt> has 10 cells and is intialized to the sequence (6, 15, 1, 10, 13, 7, 11, 8, 5, 17), and the variable x, y, n hold integers and are initialized to 0 before reaching the code.<br><code>while (n &lt; 10)</code><br><code>&nbsp;&nbsp;&nbsp;x = x + my_array[n]</code><br><code>&nbsp;&nbsp;&nbsp;n = n + 1</code><br><code>y = x / n</code><br><code>print y</code><br><br>The output of the program will be: (Remember that the result of an integer division is its quotient, which is an integer.)</p>',
'0',
'7',
'8',
'10',
'9',
'e',
'Loops',
0
);


INSERT INTO questions (questionID, parentQuestion,stem, choiceA, choiceB, choiceC, 
                       choiceD, choiceE, answer, category, versioned) VALUES (
16, 16,
'<p>For the pseudo-code program below, assume that the array name <tt>my_array</tt> has 10 cells that have been populated with numbers that are in the range of 1 to 1000. <br><code>n = 0</code><br><code>x = 1</code><br><code>while (n &lt; 11)</code><br><code>&nbsp;&nbsp;&nbsp;if (my_array[n] &lt; x) then x = my_array[n]</code><br><code>&nbsp;&nbsp;&nbsp;n = n + 1</code><br><code>print x</code><br><br>The output of this program will be:</p>',
'1000',
'10',
'11',
'12',
'1',
'e',
'Loops',
0
);


INSERT INTO questions (questionID, parentQuestion,stem, choiceA, choiceB, choiceC, 
                       choiceD, choiceE, answer, category, versioned) VALUES (
17, 17,
'<p>For the pseudo-code program below, assume that the array <tt>my_array</tt> of 10 cells is intialized to the sequence (3, 15, 29, 16, 17, 2, 18, 10, 14, 4) before reaching the statements. <br><code>n = 0</code><br><code>x = 0</code><br><code>while (n &lt; 10)</code><br><code>&nbsp;&nbsp;&nbsp;if (x &lt; my_array[n]) then x = my_array[n]</code><br><code>&nbsp;&nbsp;&nbsp;n = n + 1</code><br><code>print x</code><br><br>The output of the print statement will be:</p>',
'0',
'3',
'4',
'2',
'29',
'e',
'Loops',
0
);


INSERT INTO questions (questionID, parentQuestion,stem, choiceA, choiceB, choiceC, 
                       choiceD, choiceE, answer, category, versioned) VALUES (
18, 18,
'<p>For the pseudo-code program below and its auxiliary function:<br><code>x = 2</code><br><code>y = 50 + sqr(x)</code><br><code>print y</code><br><br><code>define sqr(x)</code><br><code>&nbsp;&nbsp;&nbsp;a = x * x</code><br><code>&nbsp;&nbsp;&nbsp;return a</code><br><br>The output of the print statement will be:</p>',
'4',
'52',
'2',
'50',
'54',
'e',
'Functions',
0
);


INSERT INTO questions (questionID, parentQuestion,stem, choiceA, choiceB, choiceC, 
                       choiceD, choiceE, answer, category, versioned) VALUES (
19, 19,
'<p>For this problem, assume that the keyword <code>enter</code> passes control to the keyboard to allow the user to enter a value. Once the code execution reaches "enter", it will await an entry and a return, and assign the value entered to the variable name listed inside curly brackets after the keyword <tt>enter</tt>. For example, for <code>enter{var}</code> the value entered by the user will be assigned to the variable <tt>var</tt>.<br><br>For the pseudo-code program below, assume an array called <tt>array_in</tt> has 1,000 cells that can hold integer values and initially contains all zeroes. Assume <code>print</code> prints the value of its argument in the same line separated by a comma when called repeatedly. (Remember that the word <code>neq</code> is used to indicate "not equal to" operator, which will return a Boolean value of <code>true</code> or <code>false</code>.)<br><code>k = 0</code><br><code>n = 0</code><br><code>t = 0</code><br><code>while ((k neq -1) AND (n &lt; 1000))</code><br><code>&nbsp;&nbsp;&nbsp;enter{k}</code><br><code>&nbsp;&nbsp;&nbsp;array_in[n] = k</code><br><code>&nbsp;&nbsp;&nbsp;n = n + 1</code><br><code>n = n - 1</code><br><code>while (n &gt; 0)</code><br><code>&nbsp;&nbsp;&nbsp;n = n - 1</code><br><code>&nbsp;&nbsp;&nbsp;x = sqr(array_in[n])</code><br><code>&nbsp;&nbsp;&nbsp;print x</code><br><br><code>define sqr(x)</code><br><code>&nbsp;&nbsp;&nbsp;a = x * x</code><br><code>&nbsp;&nbsp;&nbsp;return a</code><br><br><br>Assuming that the user enters the following sequence of numbers one by one when prompted: 7, 9, 3, 2, 4, -1, the output of the program will be: (Remember that the result of an integer division is its quotient, which is an integer.)</p>',
'16,4,9,81',
'1,16,4,9,81,49',
'49,81,9,4,16,1',
'49,81,9,4,16',
'16,4,9,81,49',
'e',
'Functions',
0
);


INSERT INTO questions (questionID, parentQuestion,stem, choiceA, choiceB, choiceC, 
                       choiceD, choiceE, answer, category, versioned) VALUES (
20, 20,
'<p>For the pseudo-code program below, assume that variables x, y, z, n and count hold integer values.<br><code>x = 255</code><br><code>y = f1(x)</code><br><code>z = f2(y)</code><br><code>print x, y, z</code><br><br><code>define f1(n)</code><br><code>&nbsp;&nbsp;&nbsp;count = 0</code><br><code>&nbsp;&nbsp;&nbsp;while(n &gt; 0)</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;n = n/2</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count = count + 1</code><br><code>&nbsp;&nbsp;&nbsp;return count</code><br><br><code>define f2(count)</code><br><code>&nbsp;&nbsp;&nbsp;n = 1</code><br><code>&nbsp;&nbsp;&nbsp;while (count &gt; 0)</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;n = n * 2</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count = count - 1</code><br><code>&nbsp;&nbsp;&nbsp;return n</code><br><br><br>The output of the program will be:</p>',
'255, 8, 255',
'255, 7, 256',
'255, 7, 128',
'255, 9, 512',
'255, 8, 256',
'e',
'Functions',
0
);


INSERT INTO questions (questionID, parentQuestion,stem, choiceA, choiceB, choiceC, 
                       choiceD, choiceE, answer, category, versioned) VALUES (
21, 21,
'For the pseudo-code program below, assume that name_array, an array of strings, has 4 cells containing names of 4 individuals, and is intialized to ["Jamie", "Ariel", " Raz", "Pat"]. Also assume that print prints the value of its string argument in the same line separated by a comma when called repeatedly:
x = 0
sayHello( )
while (x < 3)
   name = getNextName(x)
   print name
   x = x + 1

define sayHello( )
   print "Hello"

define getNextName( index )
   return nameArray( index + 1 )


The output of the program will be:',
'Hello Jamie Ariel Raz Pat',
'Hello Jamie Hello Ariel Hello Raz Hello Pat',
'Hello Ariel Hello Raz Hello Pat',
'Hello Jamie Ariel Raz',
'Hello Ariel Raz Pat',
'e',
'Functions',
0
);


INSERT INTO questions (questionID, parentQuestion,stem, choiceA, choiceB, choiceC, 
                       choiceD, choiceE, answer, category, versioned) VALUES (
22, 1,
'<p>For the pseudo-program below, assume that variables a, b, c, and d hold integer values. <br><code>a = 40</code><br><code>b = a + 80</code><br><code>c = b + 10</code><br><code>d = a + c</code><br><code>print d</code><br><br>The output of the print statement will be:</p>',
'40',
'80',
'120',
'130',
'170',
'e',
'General',
1
);


INSERT INTO questions (questionID, parentQuestion,stem, choiceA, choiceB, choiceC, 
                       choiceD, choiceE, answer, category, versioned) VALUES (
23, 1,
'<p>For the pseudo-program below, assume that variables a, b, c, and d hold integer values. <br><code>a = 50</code><br><code>b = a + 70</code><br><code>c = b + 30</code><br><code>d = a + c</code><br><code>print d</code><br><br>The output of the print statement will be:</p>',
'50',
'70',
'120',
'150',
'200',
'e',
'General',
1
);


INSERT INTO exams (examName, examGroup, dateCreated, author, current)
   VALUES ('Webcourse Preview Exam', '2020-Summer', '2020-04-05', 'ag123456', 0);
INSERT INTO exams (examName, examGroup, dateCreated, author, current)
   VALUES ('Special Testing Exam', '2020-Summer', '2020-05-07', 'ag123456', 0);
INSERT INTO exams (examName, examGroup, dateCreated, author, current)
   VALUES ('Incoming Freshman Exam', '2020-Fall', '2020-06-02', 'ag123456', 1);
INSERT INTO exams (examName, examGroup, dateCreated, author, current)
   VALUES ('Intro to C Students', '2020-Fall', '2020-06-05', 'ag123456', 0);
INSERT INTO exams (examName, examGroup, dateCreated, author, current)
   VALUES ('Intro to Computing Students', '2020-Fall', '2020-06-10', 'ag123456', 0);


INSERT INTO examContent (examID, questionID) VALUES (1,1);
INSERT INTO examContent (examID, questionID) VALUES (1,2);
INSERT INTO examContent (examID, questionID) VALUES (1,3);
INSERT INTO examContent (examID, questionID) VALUES (1,4);
INSERT INTO examContent (examID, questionID) VALUES (1,5);
INSERT INTO examContent (examID, questionID) VALUES (1,6);
INSERT INTO examContent (examID, questionID) VALUES (1,7);
INSERT INTO examContent (examID, questionID) VALUES (1,8);
INSERT INTO examContent (examID, questionID) VALUES (1,9);
INSERT INTO examContent (examID, questionID) VALUES (1,10);
INSERT INTO examContent (examID, questionID) VALUES (1,11);
INSERT INTO examContent (examID, questionID) VALUES (1,12);
INSERT INTO examContent (examID, questionID) VALUES (1,13);
INSERT INTO examContent (examID, questionID) VALUES (1,14);
INSERT INTO examContent (examID, questionID) VALUES (1,15);
INSERT INTO examContent (examID, questionID) VALUES (1,16);
INSERT INTO examContent (examID, questionID) VALUES (1,17);
INSERT INTO examContent (examID, questionID) VALUES (1,18);
INSERT INTO examContent (examID, questionID) VALUES (1,19);
INSERT INTO examContent (examID, questionID) VALUES (1,20);

INSERT INTO examContent (examID, questionID) VALUES (3,3);
INSERT INTO examContent (examID, questionID) VALUES (3,6);
INSERT INTO examContent (examID, questionID) VALUES (3,9);
INSERT INTO examContent (examID, questionID) VALUES (3,12);
INSERT INTO examContent (examID, questionID) VALUES (3,15);

INSERT INTO examContent (examID, questionID) VALUES (2,1);
INSERT INTO examContent (examID, questionID) VALUES (2,2);
INSERT INTO examContent (examID, questionID) VALUES (2,3);

INSERT INTO examContent (examID, questionID) VALUES (4,2);
INSERT INTO examContent (examID, questionID) VALUES (4,4);
INSERT INTO examContent (examID, questionID) VALUES (4,6);
INSERT INTO examContent (examID, questionID) VALUES (4,8);
INSERT INTO examContent (examID, questionID) VALUES (4,10);

INSERT INTO results (id, examID, questionID, answered, seconds) VALUES ('jd123456', 1, 1, 'e', 60);
INSERT INTO results (id, examID, questionID, answered, seconds) VALUES ('jd123456', 1, 2, 'e', 61);
INSERT INTO results (id, examID, questionID, answered, seconds) VALUES ('jd123456', 1, 3, 'e', 120);
INSERT INTO results (id, examID, questionID, answered, seconds) VALUES ('jd123456', 1, 4, 'b', 120);
INSERT INTO results (id, examID, questionID, answered, seconds) VALUES ('jd123456', 1, 5, 'e', 120);
INSERT INTO results (id, examID, questionID, answered, seconds) VALUES ('jd123456', 1, 6, 'c', 120);
INSERT INTO results (id, examID, questionID, answered, seconds) VALUES ('jd123456', 1, 7, 'e', 120);
INSERT INTO results (id, examID, questionID, answered, seconds) VALUES ('jd123456', 1, 8, 'a', 120);
INSERT INTO results (id, examID, questionID, answered, seconds) VALUES ('jd123456', 1, 9, 'a', 120);
INSERT INTO results (id, examID, questionID, answered, seconds) VALUES ('jd123456', 1, 10, 'e', 120);
INSERT INTO results (id, examID, questionID, answered, seconds) VALUES ('jd123456', 1, 11, 'e', 120);
INSERT INTO results (id, examID, questionID, answered, seconds) VALUES ('jd123456', 1, 12, 'e', 120);
INSERT INTO results (id, examID, questionID, answered, seconds) VALUES ('jd123456', 1, 13, 'e', 120);
INSERT INTO results (id, examID, questionID, answered, seconds) VALUES ('jd123456', 1, 14, 'e', 180);
INSERT INTO results (id, examID, questionID, answered, seconds) VALUES ('jd123456', 1, 15, 'e', 210);
INSERT INTO results (id, examID, questionID, answered, seconds) VALUES ('jd123456', 1, 16, 'e', 330);
INSERT INTO results (id, examID, questionID, answered, seconds) VALUES ('jd123456', 1, 17, 'e', 240);
INSERT INTO results (id, examID, questionID, answered, seconds) VALUES ('jd123456', 1, 18, 'e', 120);
INSERT INTO results (id, examID, questionID, answered, seconds) VALUES ('jd123456', 1, 19, 'e', 120);
INSERT INTO results (id, examID, questionID, answered, seconds) VALUES ('jd123456', 1, 20, 'e', 240);

INSERT INTO results (id, examID, questionID, answered, seconds) VALUES ('lw123456', 3, 3, 'e', 180);
INSERT INTO results (id, examID, questionID, answered, seconds) VALUES ('lw123456', 3, 6, 'e', 240);
INSERT INTO results (id, examID, questionID, answered, seconds) VALUES ('lw123456', 3, 9, 'a', 481);
INSERT INTO results (id, examID, questionID, answered, seconds) VALUES ('lw123456', 3, 12, 'b', 2699);
INSERT INTO results (id, examID, questionID, answered, seconds) VALUES ('lw123456', 3, 15, 'z', 0);

INSERT INTO results (id, examID, questionID, answered) VALUES ('rs123456', 3, 3, 'e');
INSERT INTO results (id, examID, questionID, answered) VALUES ('rs123456', 3, 6, 'z');

INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('jd123456', 1, 1, 'start', '2020-04-05 10:00:00');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('jd123456', 1, 1, 'next', '2020-04-05 10:01:00');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('jd123456', 1, 2, 'next', '2020-04-05 10:02:01');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('jd123456', 1, 3, 'next', '2020-04-05 10:04:01');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('jd123456', 1, 4, 'next', '2020-04-05 10:06:01');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('jd123456', 1, 5, 'next', '2020-04-05 10:08:01');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('jd123456', 1, 6, 'next', '2020-04-05 10:10:01');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('jd123456', 1, 7, 'next', '2020-04-05 10:12:01');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('jd123456', 1, 8, 'next', '2020-04-05 10:14:01');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('jd123456', 1, 9, 'next', '2020-04-05 10:16:01');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('jd123456', 1, 10, 'next', '2020-04-05 10:18:01');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('jd123456', 1, 11, 'next', '2020-04-05 10:20:01');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('jd123456', 1, 12, 'next', '2020-04-05 10:22:01');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('jd123456', 1, 13, 'next', '2020-04-05 10:24:01');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('jd123456', 1, 14, 'next', '2020-04-05 10:26:01');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('jd123456', 1, 15, 'next', '2020-04-05 10:28:01');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('jd123456', 1, 16, 'next', '2020-04-05 10:32:01');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('jd123456', 1, 17, 'previous', '2020-04-05 10:34:01');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('jd123456', 1, 16, 'previous', '2020-04-05 10:35:01');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('jd123456', 1, 15, 'previous', '2020-04-05 10:36:01');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('jd123456', 1, 14, 'next', '2020-04-05 10:37:01');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('jd123456', 1, 15, 'next', '2020-04-05 10:37:31');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('jd123456', 1, 16, 'next', '2020-04-05 10:38:01');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('jd123456', 1, 17, 'next', '2020-04-05 10:40:01');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('jd123456', 1, 18, 'next', '2020-04-05 10:42:01');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('jd123456', 1, 19, 'next', '2020-04-05 10:44:01');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('jd123456', 1, 20, 'finish', '2020-04-05 10:48:01');

INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('lw123456', 3, 3, 'start', '2020-04-08 20:00:00');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('lw123456', 3, 3, 'next', '2020-04-08 20:03:00');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('lw123456', 3, 6, 'next', '2020-04-08 20:07:00');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('lw123456', 3, 9, 'next', '2020-04-08 20:15:01');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('lw123456', 3, 12, 'timeout', '2020-04-08 21:00:00');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('lw123456', 3, 15, 'finish', '2020-04-08 21:00:01');

INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('rs123456', 3, 3, 'start', '2020-05-20 09:00:00');
INSERT INTO timelog (id, examID, questionID, actionWord, actionTime) VALUES ('rs123456', 3, 3, 'next', '2020-05-20 09:15:00');

INSERT INTO instructions (instructions) VALUES
('<p><strong>Time Limit: </strong>This is a timed exam. You will have 90 minutes to complete the exam. You can only
      take the exam one time. Do not start click the start exam button until you are ready to begin. It is recommended
      that you download these instructions using the link at the bottom of the page, and print these instructions for your
      reference during the exam. Any attempts to manipulate the timer are a violation of UCF\'s rules of conduct.</p>

    <p><strong>General Instructions:</strong> The code in all the questions in this exam are not written in any real 
      programming language. This exam is designed to test your understanding of programming concepts rather than your 
      knowledge of any specific programming language. Every question is multiple-choice and there is only one (1) 
      right answer.</p>

    <p><strong>Variables: </strong>Variables are assumed to need no prior definition/declaration before being used. 
      In this exam, variables can hold numeric values (whole numbers), or boolean values (true or false).<br /><code>
      print</code> is a generic term used as an instruction to display the output of the value of one or more 
      variables that follows <code>print</code>.</p>

    <p><strong>Operators:</strong> <code>=</code> is used to indicate the assignment operator.<br />All arithmetic 
      operators (symbols) are used (<code>+</code>, <code>-</code>, <code>*</code> and <code>/</code>). Note that 
      the division <code>/</code> is assumed to be an integer division. That means the result of <code>/</code> 
      is always an integer. The remainder is discarded. An additional operator <code>mod</code> is available to 
      get the modulus or the remainder of a division. <br /><code>eq</code> is used to indicate the equality 
      operator, which will return a Boolean value of <code>true</code> or <code>false</code>. Likewise, <code>
      neq</code> is used to indicate the "not equal to" operator.</p>

    <p><strong>While Loops:</strong> This exam uses a <code>while (condition)</code> loop construct that repeats 
      a block of indented code found below it. The block ends when the indentation stops. This repetition structure 
      is entry controlled - the block of code will be executed if the condition evaluates to true. The iteration 
      control condition will be found within parenthesis right after <code>while</code>. Note that <code>while 
      (condition)</code> does not allow the indented code block to execute when the condition evaluates to false. 
      <br />For example:<br /><code>while( x &lt; 10)</code> will execute the block of code as long as the condition 
      "x &lt; 10" evaluates to true, which means x is less than 10. It will not execute the code when x is greater 
      than or equal to 10.</p>

    <p><strong>Array data structure:</strong> An arrays data structure stores items in cells. It is defined by a 
      label as any other variable name, say <code>arrayName</code>. Each cell in an array is labeled by an index 
      (a positive integer). The first cell in the array is at index = 0, the second at index = 1, and so on. The 
      cell value at any index is accessed as <code>arrayName[index]</code>. So <code>arrayName[0]</code> will return 
      the value stored in the first cell. This exam uses arrays of numbers and an array may be initialized by a 
      sequence of numbers (num1, num2, num3,&hellip;).&nbsp;</p>

    <p><strong>Auxiliary Functions:</strong> An auxiliary function (or in short function) is a block of code that 
      does some task, and has a name associated with it. In this exam, the keyword <code>define</code> begins a 
      block of code that defines the function. A defined function has a parenthetical expression after the name 
      that may have zero or more variables. These variables if exist are used to pass values to the block of code 
      when the function is called. The format of the function definition is as follows: <code>define 
      functionName (var1, var2, &hellip;)</code> where functionName is the name given to the function being defined, 
      and var1, var2 &hellip; are the names of the variables in the function defined that will hold the values 
      passed to the function when it is called. A function may return a value. An expression following a <code>
      return</code> in the block of code that defines the function indicates the value of the expression to be 
      returned by the function.</p>');