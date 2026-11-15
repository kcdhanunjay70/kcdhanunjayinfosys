const languageConfigs = {
  c: {
    title: 'C Language',
    syllabusTitle: 'Basic to Advanced C Programming Syllabus',
    examplePrefix: 'C',
    exampleLine: '#include <stdio.h> int main(){ printf("KCDHANUNJAY INFOSYS"); return 0; }',
    usage: 'KCDHANUNJAY INFOSYS can use this concept in student verification, lab records, marks calculation, and menu-driven C projects.',
    topics: [
      ['introduction', 'Programming Introduction', ['History of C', 'Latest C23 standard', 'Features of C', 'Uses of C', 'Compiler, interpreter, IDE', 'Structure of a C program', 'Header files and main() function']],
      ['basic-structure', 'Basic Program Structure', ['Documentation section', 'Preprocessor directives', 'Global declarations', 'main() function', 'Declaration part', 'Execution part', 'Return statement', 'Program notes']],
      ['tokens', 'Tokens', ['Keywords', 'Identifiers', 'Constants', 'Strings', 'Operators', 'Special symbols']],
      ['variables', 'Variables', ['Variable declaration', 'Variable initialization', 'Naming rules', 'Local variables', 'Global variables', 'Constants using const', 'Constants using #define']],
      ['keywords', 'Keywords', ['auto', 'break', 'case', 'char', 'const', 'continue', 'default', 'do', 'double', 'else', 'enum', 'extern']],
      ['datatypes', 'Datatypes', ['int', 'float', 'double', 'char', 'void', 'Type modifiers', 'Size and range']],
      ['input-output', 'Input Output', ['printf()', 'scanf()', 'Format specifiers', 'Escape sequences', 'getchar()', 'putchar()']],
      ['operators', 'Operators', ['Arithmetic operators', 'Relational operators', 'Logical operators', 'Assignment operators', 'Increment and decrement', 'Conditional operator', 'Bitwise operators', 'Operator precedence']],
      ['control-statements', 'Control Statements', ['if', 'if else', 'Nested if', 'else if ladder', 'switch', 'break', 'continue', 'goto']],
      ['loops', 'Loops', ['while', 'do while', 'for', 'Nested loops', 'Loop control statements', 'Pattern programs']],
      ['arrays', 'Arrays', ['One-dimensional arrays', 'Two-dimensional arrays', 'Declaration and initialization', 'Array traversal', 'Matrix programs']],
      ['strings', 'Strings', ['Character arrays', 'String input/output', 'strlen', 'strcpy', 'strcat', 'strcmp', 'String manipulation programs']],
      ['functions', 'Functions', ['Function declaration', 'Function definition', 'Function calling', 'Return values', 'Arguments and parameters', 'Call by value', 'Recursion', 'Storage classes']],
      ['pointers', 'Pointers', ['Pointer basics', 'Address operator', 'Dereference operator', 'Pointer declaration', 'Pointer arithmetic', 'Pointers and arrays', 'Pointers and strings', 'Pointers and functions', 'Double pointers']],
      ['structures-unions', 'Structures and Unions', ['Structure declaration', 'Structure variables', 'Array of structures', 'Nested structures', 'Structure with functions', 'Pointers to structures', 'Union basics', 'Difference between structure and union']],
      ['file-handling', 'File Handling', ['File opening and closing', 'fopen and fclose', 'fprintf and fscanf', 'fgets and fputs', 'fread and fwrite', 'File modes', 'Text and binary files']],
      ['dynamic-memory', 'Dynamic Memory Allocation', ['malloc', 'calloc', 'realloc', 'free', 'Memory leaks', 'Dynamic arrays']],
      ['preprocessor', 'Preprocessor', ['#include', '#define', 'Macros', 'Conditional compilation', 'Header files']],
      ['advanced-c', 'Advanced C Concepts', ['Command line arguments', 'Function pointers', 'Pointer to pointer', 'Bit fields', 'Enumerations', 'Typedef', 'Modular programming', 'Multi-file programs']],
      ['data-structures', 'Data Structures Using C', ['Linked list', 'Stack', 'Queue', 'Tree basics', 'Graph basics', 'Searching', 'Sorting']],
      ['project-practice', 'Project Practice', ['Calculator', 'Student record system', 'Banking system', 'Library management', 'Quiz application', 'File-based mini project', 'Menu-driven programs']]
    ]
  },
  cpp: {
    title: 'C++ Language', syllabusTitle: 'Basic to Advanced C++ Programming Syllabus', examplePrefix: 'C++', exampleLine: '#include <iostream> using namespace std; int main(){ cout << "KCDHANUNJAY INFOSYS"; }', usage: 'KCDHANUNJAY INFOSYS can use C++ for OOP lab programs, student record systems, DSA practice, and mini projects.',
    topics: [
      ['introduction','Programming Introduction',['History of C++','Latest C++26 standard','Features of C++','C vs C++','Compiler and IDE','First C++ program','Use cases']],
      ['basic-structure','Basic Program Structure',['Documentation','Header files','Namespace','main function','Declaration','Execution']],
      ['tokens','Tokens',['Keywords','Identifiers','Literals','Operators','Punctuators']],
      ['variables','Variables',['Declaration','Initialization','Naming rules','Local/global variables','const','constexpr']],
      ['keywords','Keywords',['int','float','if','else','for','while','class','public','private','return','new','delete']],
      ['datatypes','Datatypes',['int','float','double','char','bool','string','type modifiers']],
      ['input-output','Input Output',['cout','cin','getline','Formatting output','Escape sequences','Type conversion']],
      ['operators','Operators',['Arithmetic','Relational','Logical','Assignment','Increment/decrement','Bitwise','Scope resolution']],
      ['control','Control Statements',['if','if else','nested if','else-if ladder','switch','break','continue']],
      ['loops','Loops',['for','while','do while','nested loops','range-based for','pattern programs']],
      ['arrays-strings','Arrays and Strings',['1D arrays','2D arrays','C strings','std::string','string functions','matrix programs']],
      ['functions','Functions',['Declaration','Definition','Calling','Default arguments','Inline functions','Function overloading','Recursion']],
      ['pointers-references','Pointers and References',['Pointer basics','Reference variables','Pointer arithmetic','Dynamic memory','this pointer','Pass by reference']],
      ['classes-objects','Classes and Objects',['Class definition','Objects','Data members','Member functions','Access specifiers','Encapsulation']],
      ['constructors','Constructors and Destructors',['Default constructor','Parameterized constructor','Copy constructor','Destructor','Constructor overloading','Object lifecycle']],
      ['inheritance','Inheritance',['Single','Multiple','Multilevel','Hierarchical','Hybrid','protected access']],
      ['polymorphism','Polymorphism',['Compile-time polymorphism','Runtime polymorphism','Function overloading','Operator overloading','Virtual functions','Overriding']],
      ['abstraction','Abstraction and Encapsulation',['Abstract classes','Pure virtual functions','Interfaces style design','Private data','Public methods','Data hiding']],
      ['templates','Templates',['Function templates','Class templates','Generic programming','Template parameters','Reusable components']],
      ['stl','STL',['vector','list','map','set','stack','queue','algorithms','iterators']],
      ['exceptions','Exception Handling',['try','catch','throw','Multiple catch blocks','Custom errors','Safe program flow']],
      ['files','File Handling',['fstream','ifstream','ofstream','File modes','Read/write files','Student record file project']],
      ['advanced-projects','Advanced Projects',['DSA mini project','Banking system','Library management','Result system','OOP project structure']]
    ]
  },
  java: {
    title: 'Java Language', syllabusTitle: 'Basic to Advanced Java Programming Syllabus', examplePrefix: 'Java', exampleLine: 'class Main { public static void main(String[] args){ System.out.println("KCDHANUNJAY INFOSYS"); } }', usage: 'KCDHANUNJAY INFOSYS can use Java for OOP training, backend basics, Android foundations, and student management projects.',
    topics: [
      ['introduction','Programming Introduction',['History of Java','Latest Java 26 and Java 25 LTS','Features of Java','Java platform','JDK JRE JVM','Bytecode','First Java program']],
      ['basic-structure','Basic Program Structure',['Documentation','Package statement','Import section','Class declaration','main method','Statements']],
      ['tokens','Tokens',['Keywords','Identifiers','Literals','Operators','Separators']],
      ['variables','Variables',['Variables','Primitive types','Non-primitive types','Type casting','final keyword','Wrapper classes']],
      ['keywords','Keywords',['class','public','static','void','int','if','else','for','while','return','new','try','catch']],
      ['datatypes','Datatypes',['byte','short','int','long','float','double','char','boolean','String']],
      ['input-output','Input Output',['System.out.println','Scanner','BufferedReader','Command-line input','Formatted output']],
      ['operators','Operators',['Arithmetic','Relational','Logical','Assignment','Unary','Ternary','Bitwise']],
      ['control','Control Statements',['if','if else','nested if','switch','break','continue','return']],
      ['loops','Loops',['for','while','do while','for-each','nested loops','pattern programs']],
      ['arrays','Arrays',['1D arrays','2D arrays','Array traversal','Array sorting','Arrays class','Command-line args']],
      ['strings','Strings',['String','StringBuffer','StringBuilder','String methods','Immutability','String comparison']],
      ['methods','Methods',['Method declaration','Parameters','Return type','Static methods','Overloading','Recursion']],
      ['oop','OOP Basics',['Class','Object','Constructor','this keyword','static keyword','Access modifiers']],
      ['inheritance','Inheritance',['extends','super','Single inheritance','Multilevel inheritance','Method overriding','final class']],
      ['polymorphism','Polymorphism',['Overloading','Overriding','Dynamic dispatch','Upcasting','Runtime behavior']],
      ['abstraction','Abstraction and Interfaces',['Abstract class','Abstract methods','Interface','implements','Multiple inheritance through interfaces']],
      ['packages','Packages',['Built-in packages','User-defined packages','import','Access control','Project organization']],
      ['exceptions','Exception Handling',['try','catch','finally','throw','throws','Custom exceptions']],
      ['collections','Collections Framework',['ArrayList','LinkedList','HashSet','HashMap','Iterator','Collections utility']],
      ['generics','Generics',['Generic classes','Generic methods','Type safety','Bounded types','Collections with generics']],
      ['file-io','File Handling',['File class','FileReader','FileWriter','BufferedReader','Serialization basics']],
      ['jdbc','JDBC Basics',['Driver','Connection','Statement','ResultSet','CRUD operations','Student database project']],
      ['threads','Multithreading',['Thread class','Runnable','sleep','join','synchronization','Thread lifecycle']],
      ['projects','Java Projects',['Student management','Banking app','Library system','Quiz app','Spring Boot introduction']]
    ]
  },
  javascript: {
    title: 'JavaScript Language', syllabusTitle: 'Basic to Advanced JavaScript Programming Syllabus', examplePrefix: 'JavaScript', exampleLine: 'console.log("KCDHANUNJAY INFOSYS");', usage: 'KCDHANUNJAY INFOSYS can use JavaScript for interactive websites, compiler pages, form validation, dashboards, and student portals.',
    topics: [
      ['introduction','Programming Introduction',['History of JavaScript','Latest ECMAScript 2025','Client-side scripting','Features','Browser vs Node.js','First script','Use cases']],
      ['basic-structure','Basic Program Structure',['HTML script tag','External JS file','Variables','Functions','Events','Execution']],
      ['tokens','Tokens',['Keywords','Identifiers','Literals','Operators','Punctuators']],
      ['variables','Variables',['var','let','const','Scope','Hoisting','Naming conventions']],
      ['keywords','Keywords',['var','let','const','if','else','for','while','function','return','class','new','try','catch']],
      ['datatypes','Datatypes',['number','string','boolean','undefined','null','object','array','symbol','bigint']],
      ['input-output','Input Output',['console.log','prompt','alert','DOM output','Form input','Template literals']],
      ['operators','Operators',['Arithmetic','Comparison','Logical','Assignment','Ternary','Spread','typeof']],
      ['control','Control Statements',['if','else','switch','truthy/falsy','break','continue','return']],
      ['loops','Loops',['for','while','do while','for...of','for...in','array loops']],
      ['functions','Functions',['Function declaration','Function expression','Arrow function','Parameters','Return','Callback functions']],
      ['arrays','Arrays',['Create arrays','push/pop','map','filter','reduce','find','sort']],
      ['objects','Objects',['Object literals','Properties','Methods','this keyword','Nested objects','Destructuring']],
      ['strings','Strings',['Template literals','String methods','split','replace','includes','trim']],
      ['dom','DOM Manipulation',['querySelector','textContent','classList','createElement','appendChild','style changes']],
      ['events','Events',['click','input','submit','addEventListener','event object','event delegation']],
      ['forms','Forms and Validation',['Form fields','Required checks','Pattern checks','Error messages','Student form validation']],
      ['es6','ES6+ Features',['let/const','Arrow functions','Classes','Modules','Spread/rest','Destructuring']],
      ['async','Async JavaScript',['setTimeout','Promises','async/await','fetch','API calls','Error handling']],
      ['json','JSON and APIs',['JSON parse','JSON stringify','REST APIs','Fetch data','Render API response']],
      ['storage','Browser Storage',['localStorage','sessionStorage','cookies basics','Save preferences','Offline mini data']],
      ['node-basics','Node.js Basics',['Runtime','npm','modules','fs basics','Express introduction','Backend route basics']],
      ['projects','JavaScript Projects',['Calculator','Todo app','Quiz app','Student dashboard','API search app','Form validation project']]
    ]
  },
  python: {
    title: 'Python Language', syllabusTitle: 'Basic to Advanced Python Programming Syllabus', examplePrefix: 'Python', exampleLine: 'print("KCDHANUNJAY INFOSYS")', usage: 'KCDHANUNJAY INFOSYS can use Python for beginner programming, automation, data handling, AI basics, and student utility projects.',
    topics: [
      ['intro-python','Programming Introduction',['History of Python','Latest Python 3.14 series','Features','Uses','Interpreter','First Python program','Python vs other languages']],
      ['setup','Python Setup',['Install Python','PATH setup','IDLE','VS Code','pip','Virtual environment']],
      ['character-set','Python Character Set',['Letters','Digits','Special symbols','Whitespace characters','Unicode characters','Escape characters']],
      ['syntax','Python Syntax',['Indentation','Statements','Input/output','Naming rules','PEP 8 basics','Readable code style']],
      ['basic-structure','Basic Program Structure',['Documentation Section','Import Section','Constants','Global Declaration','Function Definition','Main Execution']],
      ['tokens','Tokens',['Keywords','Identifiers','Literals','Operators','Delimiters']],
      ['variables','Variables',['Dynamic typing','Assignment','Multiple assignment','Constants convention','Scope basics']],
      ['keywords','Keywords',['Data type keywords','Condition keywords','Loop keywords','Function keywords','Class keywords','Exception keywords']],
      ['datatypes','Datatypes',['int','float','str','bool','list','tuple','set','dict','None']],
      ['input-output','Input Output',['input()','print()','Type conversion','split()','Formatted output','File input output']],
      ['operators','Operators',['Arithmetic','Comparison','Logical','Assignment','Membership','Identity','Bitwise']],
      ['control','Control Statements',['if','elif','else','match basics','pass','break','continue']],
      ['loops','Loops',['for','while','range','nested loops','loop else','patterns']],
      ['strings','Strings',['Indexing','Slicing','String methods','f-strings','split/join','formatting']],
      ['lists','Lists',['Create list','append','remove','sort','slicing','list comprehension']],
      ['tuples-sets','Tuples and Sets',['Tuple basics','Immutability','Set basics','Union','Intersection','Unique values']],
      ['dictionaries','Dictionaries',['Key-value pairs','get','update','items','Nested dictionaries','Student records']],
      ['functions','Functions',['def','Parameters','Return','Default arguments','*args','**kwargs','Lambda']],
      ['modules','Modules and Packages',['import','Built-in modules','Custom modules','pip packages','Project structure']],
      ['files','File Handling',['open','read','write','with statement','CSV basics','JSON files']],
      ['exceptions','Exception Handling',['try','except','finally','raise','Custom messages','Safe input handling']],
      ['oop','OOP in Python',['Class','Object','__init__','self','Methods','Attributes']],
      ['inheritance','Inheritance and Polymorphism',['Single inheritance','Method overriding','super','Duck typing','Encapsulation basics']],
      ['advanced','Advanced Python',['Decorators','Generators','Iterators','Comprehensions','Context managers']],
      ['database','Database and APIs',['SQLite basics','CRUD','requests','JSON API','Student verification data']],
      ['data-ai','Data and AI Basics',['NumPy intro','Pandas intro','Matplotlib intro','ML idea','AI project path']],
      ['projects','Python Projects',['Calculator','Student record app','File organizer','Quiz app','Web scraper basics','Data analysis mini project']]
    ]
  }
};

function detailFor(language, topic, subtopic) {
  if (language.title === 'C Language') {
    return cDetailFor(topic, subtopic);
  }
  const lower = subtopic.toLowerCase();
  const isPython = language.title === 'Python Language';
  const definition = isPython
    ? `${subtopic} is an important part of ${topic.title}. It explains how Python programs are written in a simple, readable, and practical way for real applications.`
    : `${subtopic} in ${language.title} is a core concept used to write correct, readable, and practical programs. It helps students understand how ${topic.title.toLowerCase()} works in real coding.`;
  const example = isPython
    ? `Python example: ${pythonExampleFor(topic.title, subtopic)}`
    : `${language.examplePrefix} example: ${language.exampleLine}`;
  let usage = language.usage;
  if (lower.includes('student') || lower.includes('record') || lower.includes('database') || lower.includes('file')) {
    usage = 'Real-time usage: store, search, and verify KCDHANUNJAY INFOSYS student data such as SARVA UID 4501218, course name, marks, and certificate status.';
  } else if (lower.includes('input') || lower.includes('form') || lower.includes('scanf') || lower.includes('cin')) {
    usage = 'Real-time usage: collect student UID, name, mobile number, course, and marks in a KCDHANUNJAY INFOSYS form or compiler practice program.';
  } else if (lower.includes('loop') || lower.includes('array') || lower.includes('list') || lower.includes('collection')) {
    usage = 'Real-time usage: process many student records, course rows, marks lists, and verification entries without repeating code manually.';
  } else if (lower.includes('object') || lower.includes('class') || lower.includes('structure')) {
    usage = 'Real-time usage: group one student UID, name, course, marks, and status as one clean record in a KCDHANUNJAY INFOSYS project.';
  }
  return [subtopic, definition, example, usage];
}

function cDetailFor(topic, subtopic) {
  const key = `${topic.id}:${subtopic}`.toLowerCase();
  const lower = subtopic.toLowerCase();
  const topicName = topic.title;
  const baseProgram = '#include <stdio.h>\n\nint main() {\n    printf("KCDHANUNJAY INFOSYS\\\\n");\n    return 0;\n}';
  const baseOutput = 'KCDHANUNJAY INFOSYS';

  const exact = {
    'introduction:history of c': [
      'History of C',
      'C is a general-purpose, procedural programming language developed by Dennis Ritchie at Bell Labs in the early 1970s. It became popular because UNIX was rewritten in C, making system software portable and easier to maintain.',
      'No syntax. This is a theory topic.',
      baseProgram,
      baseOutput,
      'Early languages: Assembly, B, C. C standards: K&R C, ANSI C/C89, C99, C11, C17/C18, C23.',
      'Useful for explaining why C is still used in operating systems, embedded systems, compilers, device drivers, and performance-critical software.'
    ],
    'introduction:latest c23 standard': [
      'Latest C23 standard',
      'C23, published as ISO/IEC 9899:2024, is the current modern C language standard. Students can learn normal C basics first and then understand the new C23 additions step by step.',
      'Use a modern compiler mode such as -std=c23 when the compiler supports it.',
      '#include <stdio.h>\n\nint main() {\n    printf("Learning modern C23 basics\\n");\n    return 0;\n}',
      'Learning modern C23 basics',
      'Important modern points: nullptr, binary number literals, digit separators, improved enum support, better standard library direction, and cleaner modern C practice.',
      'Useful for keeping C material updated for current compilers, interviews, embedded systems, operating systems, and performance-focused programming.'
    ],
    'introduction:features of c': [
      'Features of C',
      'Features are the important qualities that make C powerful, fast, portable, structured, and suitable for both application and system programming.',
      'A C program commonly uses functions, variables, operators, control statements, arrays, pointers, structures, and files.',
      '#include <stdio.h>\n\nint main() {\n    int marks = 95;\n    printf("Marks = %d\\\\n", marks);\n    return 0;\n}',
      'Marks = 95',
      'Main features: simple, structured, compiled, portable, fast, middle-level, rich library, pointer support, dynamic memory support.',
      'Helps students understand why C is used for lab programs, operating systems, embedded devices, and interview foundations.'
    ],
    'basic-structure:structure of a c program': [
      'Structure of a C program',
      'The structure of a C program is the standard arrangement of documentation, preprocessor directives, global declarations, main function, local declarations, executable statements, and user-defined functions.',
      '#include <stdio.h>\n\nint main() {\n    int marks = 95;\n    printf("Marks = %d\\n", marks);\n    return 0;\n}',
      '#include <stdio.h>\n\nint main() {\n    printf("Welcome to C Programming\\\\n");\n    return 0;\n}',
      'Welcome to C Programming',
      'Sections: documentation, link/preprocessor, definition, global declaration, main(), declaration part, execution part, subprogram/user-defined functions.',
      'Used to write neat lab programs, mini projects, and compiler practice examples without missing required parts.'
    ],
    'tokens:keywords': [
      'Keywords',
      'Keywords are reserved words in C that have predefined meaning. They cannot be used as variable names, function names, or identifiers.',
      'int marks;\nif (marks >= 35) { }\nreturn 0;',
      '#include <stdio.h>\n\nint main() {\n    int marks = 85;\n    if (marks >= 35) {\n        printf("Pass\\\\n");\n    }\n    return 0;\n}',
      'Pass',
      'C has reserved keywords such as int, char, float, double, if, else, for, while, do, switch, case, break, continue, return, struct, union, enum, typedef, const, static, extern, volatile, void, sizeof.',
      'Keywords are used in every C program for data declaration, decisions, loops, functions, structures, and storage control.'
    ],
    'variables:variable declaration': [
      'Variable declaration',
      'Variable declaration tells the compiler the variable name and data type before the variable is used.',
      'data_type variable_name;',
      '#include <stdio.h>\n\nint main() {\n    int age;\n    age = 20;\n    printf("Age = %d\\\\n", age);\n    return 0;\n}',
      'Age = 20',
      'Declarations can be local, global, static, extern, single declaration, or multiple declaration.',
      'Used to store student age, marks, roll number, fee, quantity, and other project data.'
    ],
    'datatypes:int': [
      'int',
      'int is a fundamental data type used to store whole numbers without decimal values.',
      'int variable_name = value;',
      '#include <stdio.h>\n\nint main() {\n    int marks = 90;\n    printf("Marks = %d\\\\n", marks);\n    return 0;\n}',
      'Marks = 90',
      'Integer types: short int, int, long int, long long int, signed int, unsigned int.',
      'Used for marks, age, roll number, count, menu choices, and loop counters.'
    ],
    'input-output:printf()': [
      'printf()',
      'printf() is a standard output function used to display text, numbers, variables, and formatted results on the screen.',
      'printf("format string", values);',
      '#include <stdio.h>\n\nint main() {\n    int marks = 95;\n    printf("Student Marks = %d\\\\n", marks);\n    return 0;\n}',
      'Student Marks = 95',
      'Output can be plain text, formatted integers, floats, characters, strings, and escape-sequence based output.',
      'Used in every C program to show results, bills, reports, menu options, and messages.'
    ],
    'input-output:scanf()': [
      'scanf()',
      'scanf() is a standard input function used to read formatted input from the keyboard.',
      'scanf("format specifier", &variable);',
      '#include <stdio.h>\n\nint main() {\n    int marks;\n    printf("Enter marks: ");\n    scanf("%d", &marks);\n    printf("Marks = %d\\\\n", marks);\n    return 0;\n}',
      'Enter marks: 85\nMarks = 85',
      'Input types: integer input, float input, character input, string input, multiple-value input.',
      'Used to collect student marks, course choice, bill quantity, menu option, and user data.'
    ],
    'operators:arithmetic operators': [
      'Arithmetic operators',
      'Arithmetic operators perform mathematical operations such as addition, subtraction, multiplication, division, and remainder.',
      'a + b; a - b; a * b; a / b; a % b;',
      '#include <stdio.h>\n\nint main() {\n    int a = 10, b = 3;\n    printf("Add = %d\\\\n", a + b);\n    printf("Mod = %d\\\\n", a % b);\n    return 0;\n}',
      'Add = 13\nMod = 1',
      'Types: addition (+), subtraction (-), multiplication (*), division (/), modulus (%).',
      'Used for totals, percentages, billing, averages, EMI basics, and marks calculation programs.'
    ],
    'control-statements:if': [
      'if',
      'if is a decision-making statement that executes a block only when the condition is true.',
      'if (condition) {\n    statements;\n}',
      '#include <stdio.h>\n\nint main() {\n    int marks = 85;\n    if (marks >= 35) {\n        printf("Pass\\\\n");\n    }\n    return 0;\n}',
      'Pass',
      'Decision statements: if, if else, nested if, else-if ladder, switch.',
      'Used for pass/fail result, eligibility check, login validation, and menu conditions.'
    ],
    'loops:for': [
      'for',
      'for loop is an entry-controlled loop used when the number of repetitions is known.',
      'for (initialization; condition; update) {\n    statements;\n}',
      '#include <stdio.h>\n\nint main() {\n    int i;\n    for (i = 1; i <= 5; i++) {\n        printf("%d ", i);\n    }\n    return 0;\n}',
      '1 2 3 4 5',
      'Loop types: for, while, do while, nested loops.',
      'Used for printing series, processing arrays, pattern programs, and repeated menu operations.'
    ],
    'arrays:one-dimensional arrays': [
      'One-dimensional arrays',
      'A one-dimensional array stores multiple values of the same data type using a single variable name and index positions.',
      'data_type array_name[size];',
      '#include <stdio.h>\n\nint main() {\n    int marks[3] = {80, 90, 85};\n    printf("%d\\\\n", marks[1]);\n    return 0;\n}',
      '90',
      'Array types: one-dimensional arrays, two-dimensional arrays, multidimensional arrays.',
      'Used to store marks list, roll numbers, item prices, attendance values, and repeated data.'
    ],
    'strings:character arrays': [
      'Character arrays',
      'In C, a string is commonly stored as a character array terminated by the null character \\0.',
      'char name[size] = "text";',
      '#include <stdio.h>\n\nint main() {\n    char course[] = "C Language";\n    printf("%s\\\\n", course);\n    return 0;\n}',
      'C Language',
      'String storage: character array, string literal, array of strings, pointer to string.',
      'Used to store names, course titles, passwords, messages, and certificate text.'
    ],
    'functions:function declaration': [
      'Function declaration',
      'Function declaration tells the compiler the function name, return type, and parameters before the function is called.',
      'return_type function_name(parameter_list);',
      '#include <stdio.h>\n\nint add(int a, int b);\n\nint main() {\n    printf("Sum = %d\\\\n", add(10, 20));\n    return 0;\n}\n\nint add(int a, int b) {\n    return a + b;\n}',
      'Sum = 30',
      'Function parts: declaration/prototype, definition, calling, arguments, parameters, return value.',
      'Used to divide large programs into small reusable modules like calculateTotal(), printResult(), and searchStudent().'
    ],
    'pointers:pointer basics': [
      'Pointer basics',
      'A pointer is a variable that stores the memory address of another variable.',
      'data_type *pointer_name;\npointer_name = &variable;',
      '#include <stdio.h>\n\nint main() {\n    int marks = 95;\n    int *ptr = &marks;\n    printf("Value = %d\\\\n", *ptr);\n    return 0;\n}',
      'Value = 95',
      'Pointer types: null pointer, void pointer, wild pointer, dangling pointer, function pointer, pointer to pointer.',
      'Used for dynamic memory, arrays, strings, functions, data structures, and efficient system programming.'
    ],
    'structures-unions:structure declaration': [
      'Structure declaration',
      'A structure is a user-defined data type that groups different types of related data under one name.',
      'struct StructureName {\n    data_type member1;\n    data_type member2;\n};',
      '#include <stdio.h>\n\nstruct Student {\n    int roll;\n    char grade;\n};\n\nint main() {\n    struct Student s1 = {101, \'A\'};\n    printf("Roll = %d, Grade = %c\\\\n", s1.roll, s1.grade);\n    return 0;\n}',
      'Roll = 101, Grade = A',
      'Structure forms: simple structure, nested structure, array of structures, pointer to structure, self-referential structure.',
      'Used to build student records, employee records, library books, bank accounts, and project data models.'
    ],
    'file-handling:file opening and closing': [
      'File opening and closing',
      'File opening connects a C program to a file, and file closing releases the file safely after reading or writing.',
      'FILE *fp;\nfp = fopen("file.txt", "mode");\nfclose(fp);',
      '#include <stdio.h>\n\nint main() {\n    FILE *fp = fopen("student.txt", "w");\n    fprintf(fp, "KCD Student\\\\n");\n    fclose(fp);\n    printf("File saved\\\\n");\n    return 0;\n}',
      'File saved',
      'File types: text files and binary files. File modes: r, w, a, r+, w+, a+, rb, wb, ab.',
      'Used to save student records, bills, marks reports, login data, and mini project data permanently.'
    ],
    'dynamic-memory:malloc': [
      'malloc',
      'malloc() dynamically allocates a block of memory during runtime and returns a pointer to the first byte.',
      'pointer = (type*) malloc(size_in_bytes);',
      '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *p = (int*) malloc(sizeof(int));\n    *p = 100;\n    printf("Value = %d\\\\n", *p);\n    free(p);\n    return 0;\n}',
      'Value = 100',
      'Dynamic memory functions: malloc(), calloc(), realloc(), free().',
      'Used when the required number of records is known only at runtime, such as student lists and dynamic arrays.'
    ],
    'preprocessor:#include': [
      '#include',
      '#include is a preprocessor directive used to add header file contents before compilation.',
      '#include <header_file.h>\n#include "user_header.h"',
      '#include <stdio.h>\n\nint main() {\n    printf("Header file included\\\\n");\n    return 0;\n}',
      'Header file included',
      'Header inclusion types: angle brackets for standard headers, double quotes for user-defined headers.',
      'Used to access standard library functions like printf(), scanf(), malloc(), strlen(), and file functions.'
    ],
    'advanced-c:command line arguments': [
      'Command line arguments',
      'Command line arguments allow values to be passed to a C program from the command prompt during execution.',
      'int main(int argc, char *argv[])',
      '#include <stdio.h>\n\nint main(int argc, char *argv[]) {\n    printf("Argument count = %d\\\\n", argc);\n    return 0;\n}',
      'Argument count = 1',
      'Arguments: argc stores count, argv stores argument strings.',
      'Used for command-line tools, file converters, automation utilities, and system programs.'
    ],
    'data-structures:linked list': [
      'Linked list',
      'A linked list is a dynamic data structure where each node stores data and the address of the next node.',
      'struct Node {\n    int data;\n    struct Node *next;\n};',
      '#include <stdio.h>\n\nstruct Node {\n    int data;\n    struct Node *next;\n};\n\nint main() {\n    struct Node n1, n2;\n    n1.data = 10;\n    n1.next = &n2;\n    n2.data = 20;\n    n2.next = NULL;\n    printf("%d %d\\\\n", n1.data, n1.next->data);\n    return 0;\n}',
      '10 20',
      'Linked list types: singly linked list, doubly linked list, circular linked list.',
      'Used in dynamic records, memory management, stacks, queues, playlists, and real-time data structures.'
    ],
    'project-practice:calculator': [
      'Calculator',
      'A calculator project is a beginner-friendly C program that performs arithmetic operations using input, operators, conditions, and functions.',
      'Read numbers -> choose operator -> calculate -> print result',
      '#include <stdio.h>\n\nint main() {\n    int a = 10, b = 5;\n    char op = \'+\';\n    if (op == \'+\') printf("Result = %d\\\\n", a + b);\n    return 0;\n}',
      'Result = 15',
      'Calculator types: basic calculator, menu-driven calculator, function-based calculator, scientific calculator basics.',
      'Useful as a first mini project to practice variables, operators, if/switch, functions, and formatted output.'
    ]
  };

  if (exact[key]) {
    const [title, definition, syntax, program, output, classifications, usage] = exact[key];
    return [title, definition, '', usage, syntax, program, output, classifications];
  }

  let definition = `${subtopic} is an important concept in ${topicName}. It helps students write correct C programs with clear logic, proper syntax, and practical problem-solving ability.`;
  let syntax = 'General syntax depends on the concept:\n#include <stdio.h>\n\nint main() {\n    int marks = 95;\n    printf("Marks = %d\\n", marks);\n    return 0;\n}';
  let program = baseProgram;
  let output = baseOutput;
  let classifications = 'Not applicable for this subtopic. If the topic has types, learn the related categories, rules, and use cases.';
  let usage = 'Used in C lab programs, compiler practice, student record systems, menu-driven projects, and interview preparation.';

  if (topic.id === 'control-statements') {
    definition = `${subtopic} is a control statement concept used to control the flow of execution based on conditions or jumps.`;
    syntax = 'if (condition) {\n    statements;\n} else {\n    statements;\n}';
    program = '#include <stdio.h>\n\nint main() {\n    int marks = 72;\n    if (marks >= 35) printf("Pass\\\\n");\n    else printf("Fail\\\\n");\n    return 0;\n}';
    output = 'Pass';
    classifications = 'Decision statements: if, if else, nested if, else-if ladder, switch. Jump statements: break, continue, goto, return.';
  } else if (topic.id === 'loops') {
    definition = `${subtopic} is a looping concept used to repeat statements until a condition becomes false or the required count is completed.`;
    syntax = 'while (condition) {\n    statements;\n}\n\nfor (initialization; condition; update) {\n    statements;\n}';
    program = '#include <stdio.h>\n\nint main() {\n    int i;\n    for (i = 1; i <= 3; i++) printf("%d ", i);\n    return 0;\n}';
    output = '1 2 3';
    classifications = 'Loop types: while, do while, for, nested loops. Loop control: break, continue.';
  } else if (topic.id === 'arrays') {
    definition = `${subtopic} is an array concept used to store and process multiple values of the same data type using indexes.`;
    syntax = 'data_type array_name[size];\ndata_type matrix[rows][columns];';
    program = '#include <stdio.h>\n\nint main() {\n    int a[3] = {10, 20, 30};\n    printf("%d\\\\n", a[2]);\n    return 0;\n}';
    output = '30';
    classifications = 'Array classifications: one-dimensional, two-dimensional, multidimensional, static arrays, dynamic arrays.';
  } else if (topic.id === 'strings') {
    definition = `${subtopic} is a string concept used to store and manipulate text using character arrays and string library functions.`;
    syntax = 'char str[size];\n#include <string.h>';
    program = '#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char name[] = "KCD";\n    printf("Length = %lu\\\\n", strlen(name));\n    return 0;\n}';
    output = 'Length = 3';
    classifications = 'String operations: input/output, length, copy, concatenate, compare, search, reverse logic.';
  } else if (topic.id === 'functions') {
    definition = `${subtopic} is a function concept used to divide a large C program into reusable blocks.`;
    syntax = 'return_type function_name(parameter_list) {\n    statements;\n    return value;\n}';
    program = '#include <stdio.h>\n\nint square(int n) {\n    return n * n;\n}\n\nint main() {\n    printf("%d\\\\n", square(5));\n    return 0;\n}';
    output = '25';
    classifications = 'Function types: library functions, user-defined functions, no argument/no return, argument/no return, no argument/return, argument/return, recursive functions.';
  } else if (topic.id === 'pointers') {
    definition = `${subtopic} is a pointer concept used to work with memory addresses and indirect access to values.`;
    syntax = 'data_type *ptr;\nptr = &variable;\nvalue = *ptr;';
    program = '#include <stdio.h>\n\nint main() {\n    int x = 10;\n    int *p = &x;\n    printf("%d\\\\n", *p);\n    return 0;\n}';
    output = '10';
    classifications = 'Pointer types: null pointer, void pointer, wild pointer, dangling pointer, double pointer, function pointer.';
  } else if (topic.id === 'structures-unions') {
    definition = `${subtopic} is used to create user-defined data types for grouping related values.`;
    syntax = 'struct Name {\n    data_type member;\n};\n\nunion Name {\n    data_type member;\n};';
    program = '#include <stdio.h>\n\nstruct Student { int roll; };\n\nint main() {\n    struct Student s = {101};\n    printf("%d\\\\n", s.roll);\n    return 0;\n}';
    output = '101';
    classifications = 'Types: structures, nested structures, array of structures, pointer to structure, unions, nested unions.';
  } else if (topic.id === 'file-handling') {
    definition = `${subtopic} is a file handling concept used to store, read, update, and manage data permanently in files.`;
    syntax = 'FILE *fp;\nfp = fopen("filename", "mode");\nfprintf(fp, "Student record");\nfclose(fp);';
    program = '#include <stdio.h>\n\nint main() {\n    FILE *fp = fopen("demo.txt", "w");\n    fprintf(fp, "Hello File");\n    fclose(fp);\n    printf("Saved\\\\n");\n    return 0;\n}';
    output = 'Saved';
    classifications = 'File types: text and binary. Modes: r, w, a, r+, w+, a+, rb, wb, ab.';
  } else if (topic.id === 'dynamic-memory') {
    definition = `${subtopic} is a dynamic memory concept used to allocate, resize, and release memory during program execution.`;
    syntax = 'ptr = malloc(size);\nptr = calloc(n, size);\nptr = realloc(ptr, new_size);\nfree(ptr);';
    program = '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *p = malloc(sizeof(int));\n    *p = 50;\n    printf("%d\\\\n", *p);\n    free(p);\n    return 0;\n}';
    output = '50';
    classifications = 'Functions: malloc, calloc, realloc, free. Issues: memory leak, dangling pointer, allocation failure.';
  } else if (topic.id === 'operators') {
    definition = `${subtopic} is an operator concept used to calculate, compare, assign, combine, or manipulate values.`;
    syntax = 'operand1 operator operand2;';
    program = '#include <stdio.h>\n\nint main() {\n    int total = 80 + 15;\n    printf("%d\\\\n", total);\n    return 0;\n}';
    output = '95';
    classifications = 'Operator types: arithmetic, relational, logical, assignment, increment/decrement, conditional, bitwise, special operators.';
  } else if (topic.id === 'datatypes') {
    definition = `${subtopic} is a data type concept that decides what kind of value a variable can store and how much memory it may need.`;
    syntax = 'data_type variable_name = value;';
    program = '#include <stdio.h>\n\nint main() {\n    float percentage = 86.5;\n    printf("%.1f\\\\n", percentage);\n    return 0;\n}';
    output = '86.5';
    classifications = 'Data type classifications: basic/fundamental, derived, user-defined, void, type modifiers.';
  }

  return [subtopic, definition, '', usage, syntax, program, output, classifications];
}

function pythonExampleFor(topicTitle, subtopic) {
  const lower = `${topicTitle} ${subtopic}`.toLowerCase();
  if (lower.includes('install') || lower.includes('setup') || lower.includes('pip')) return 'python --version; pip install requests';
  if (lower.includes('input')) return 'name = input("Student name: "); print(name)';
  if (lower.includes('variable') || lower.includes('assignment')) return 'student_name = "KCD Student"; marks = 95';
  if (lower.includes('string')) return 'course = "Python"; print(course.upper())';
  if (lower.includes('list')) return 'marks = [90, 85, 95]; print(sum(marks) / len(marks))';
  if (lower.includes('tuple')) return 'student = ("4501218", "Python", "Verified")';
  if (lower.includes('set')) return 'unique_courses = {"Python", "Java", "Python"}';
  if (lower.includes('dict') || lower.includes('record')) return 'student = {"uid": "4501218", "course": "Python"}';
  if (lower.includes('function') || lower.includes('def')) return 'def verify(uid): return uid == "4501218"';
  if (lower.includes('module') || lower.includes('import')) return 'import math; print(math.sqrt(81))';
  if (lower.includes('file') || lower.includes('csv') || lower.includes('json')) return 'with open("students.txt", "w") as f: f.write("4501218")';
  if (lower.includes('exception') || lower.includes('try')) return 'try: marks = int(input()); except ValueError: print("Invalid marks")';
  if (lower.includes('class') || lower.includes('object') || lower.includes('oop')) return 'class Student: pass';
  if (lower.includes('inherit') || lower.includes('polymorphism')) return 'class PythonStudent(Student): pass';
  if (lower.includes('database') || lower.includes('sqlite')) return 'import sqlite3; conn = sqlite3.connect("kcd.db")';
  if (lower.includes('api') || lower.includes('requests')) return 'import requests; data = requests.get(url).json()';
  if (lower.includes('data') || lower.includes('ai') || lower.includes('pandas')) return 'import pandas as pd; df = pd.DataFrame([{"marks": 95}])';
  if (lower.includes('project')) return 'while True: print("1.Verify 2.Exit")';
  if (lower.includes('loop') || lower.includes('range')) return 'for i in range(1, 6): print(i)';
  if (lower.includes('operator')) return 'eligible = marks >= 35 and attendance >= 75';
  if (lower.includes('control') || lower.includes('if') || lower.includes('elif')) return 'if marks >= 35: print("Pass")';
  return 'print("KCDHANUNJAY INFOSYS")';
}

const pythonTopicExtras = Object.fromEntries([
  ['intro-python', 'Python explains programming basics with readable English-like syntax|Understand Python -> write first program -> run output -> apply in student utilities|Beginner learning, automation scripts, data analysis start, web/app backend basics'],
  ['basic-structure', 'Basic structure divides a Python program into documentation, imports, constants, functions, and execution logic|Write documentation -> import modules -> define constants -> create functions -> run main block|Clean lab records, reusable programs, mini project structure'],
  ['tokens', 'Tokens are the smallest meaningful units of a Python program|Write code -> identify keywords -> name identifiers -> use literals/operators -> separate with delimiters|Compiler basics, error checking, interview foundation'],
  ['keywords', 'Keywords are reserved words that control Python program behavior|Learn keyword -> understand purpose -> write example -> avoid using as variable name|Conditions, loops, functions, classes, exception handling'],
  ['setup', 'Setup connects Python interpreter, editor, package manager, and virtual environment|Install Python -> set PATH -> choose editor -> create venv -> install package|Lab systems, online compiler practice, project environment setup'],
  ['syntax', 'Syntax rules decide how Python reads indentation, statements, comments, and naming|Write statement -> indent block -> run -> fix syntax errors|Clean lab records, readable project files, easy debugging'],
  ['variables', 'Variables store changing program data without fixed type declarations|Create name -> assign value -> update value -> use in output|Student UID, marks, course, fee, attendance values'],
  ['datatypes', 'Data types classify values such as numbers, text, collections, and missing data|Input value -> choose type -> process safely -> display result|Marks, names, course lists, student dictionaries, status flags'],
  ['input-output', 'Input and output handle user data entry and result display in Python|Read input -> convert type -> process -> print formatted output|Student forms, marks entry, lab programs, file reports'],
  ['operators', 'Operators perform calculations, comparisons, logic, and membership checks|Read values -> apply operator -> produce decision/result|Pass/fail checks, fee totals, eligibility, search conditions'],
  ['control', 'Control statements choose which block should run based on conditions|Condition -> true block or false block -> next step|Admission eligibility, login validation, grade decisions'],
  ['loops', 'Loops repeat a block for many values without writing duplicate code|Start -> check condition -> run body -> update -> repeat/stop|Printing reports, processing many students, pattern programs'],
  ['strings', 'Strings store and process text data such as names, messages, and course titles|Read text -> clean -> format -> compare/search|Student names, certificate text, search fields, alerts'],
  ['lists', 'Lists store ordered, changeable collections of values|Create list -> add/remove -> loop -> calculate result|Marks list, course list, attendance entries, dashboard rows'],
  ['tuples-sets', 'Tuples protect fixed records while sets remove duplicate values|Tuple for fixed data -> set for unique values -> combine results|Fixed UID-course pairs, unique course names, duplicate removal'],
  ['dictionaries', 'Dictionaries store labelled key-value data like a real record|Create keys -> update values -> read safely -> nest records|Student profile, SARVA verification response, JSON API data'],
  ['functions', 'Functions split programs into reusable named blocks|Input arguments -> process -> return output -> reuse|Verify UID, calculate marks, print receipt, validate forms'],
  ['modules', 'Modules and packages organize code and add ready-made features|Import module -> call function -> create package -> reuse|Math tools, date handling, project utilities, pip libraries'],
  ['files', 'File handling saves and reads data permanently outside program memory|Open file -> read/write -> close safely -> parse content|Student records, certificates, CSV exports, JSON backups'],
  ['exceptions', 'Exception handling keeps programs running when input or runtime errors occur|Try risky code -> catch error -> show message -> continue safely|Wrong marks input, missing file, API failure, invalid UID'],
  ['oop', 'OOP groups data and behavior into classes and objects|Class design -> object creation -> methods -> attributes|Student object, Course object, Certificate object, dashboard models'],
  ['inheritance', 'Inheritance reuses parent class features and polymorphism allows common method names|Parent class -> child class -> override method -> common interface|Different student/course types, reusable project models'],
  ['advanced', 'Advanced Python improves reusable, memory-friendly, and professional code|Iterator/generator -> decorator/context manager -> clean abstraction|Large data processing, logging, validation wrappers, efficient reports'],
  ['database', 'Database and APIs connect Python programs with stored records and online services|Connect -> CRUD/query -> call API -> parse JSON -> display|Student verification, course records, certificates, remote dashboards'],
  ['data-ai', 'Data and AI basics introduce analysis, charts, and prediction workflows|Collect data -> clean -> analyze -> visualize -> model idea|Marks analysis, attendance trends, simple prediction demos'],
  ['projects', 'Projects combine all Python topics into useful end-to-end applications|Plan -> code modules -> test -> save data -> present output|Calculator, student record app, quiz app, file organizer, data mini project']
].map(([id, value]) => {
  const [concept, flowText, applicationsText] = value.split('|');
  const title = languageConfigs.python.topics.find(([topicId]) => topicId === id)?.[1] || id;
  return [id, {
    concept,
    diagram: [`${title} Concept`, 'Python Code', 'Output / Data', 'KCD Real Usage'],
    flow: flowText.split(' -> '),
    table: [
      ['Learning Focus', concept],
      ['Practice Style', 'Write small examples, test output, then convert into a mini project task.'],
      ['KCD Example', 'Use SARVA UID 4501218, course names, marks, and verification status as sample data.']
    ],
    applications: applicationsText.split(', ')
  }];
}));

const pythonTopicDocumentBlocks = {
  'character-set': [
    { type: 'heading', text: 'Python Character Set' },
    { type: 'paragraph', text: 'Python character set means the valid characters that can be used to write Python programs. These characters are used to create identifiers, keywords, strings, numbers, operators, comments, and program statements.' },
    { type: 'heading', text: 'Letters' },
    { type: 'paragraph', text: 'Python supports uppercase and lowercase English letters. Letters are commonly used in variable names, function names, class names, and string values.' },
    { type: 'paragraph', text: 'Examples:' },
    { type: 'code', text: 'name = "Ravi"\ncourse = "Python"\nprint(name, course)' },
    { type: 'paragraph', text: 'Valid letters: A to Z and a to z.' },
    { type: 'heading', text: 'Digits' },
    { type: 'paragraph', text: 'Digits are used in numbers, calculations, variable values, indexing, and identifiers after the first character.' },
    { type: 'paragraph', text: 'Examples:' },
    { type: 'code', text: 'age = 20\nmarks = 95\nstudent2_marks = 88\nprint(age, marks, student2_marks)' },
    { type: 'paragraph', text: 'Valid digits: 0 to 9.' },
    { type: 'heading', text: 'Special Symbols' },
    { type: 'paragraph', text: 'Special symbols are used for operators, punctuation, indexing, function calls, string creation, comments, and program structure.' },
    { type: 'table', rows: [
      ['Symbol Type', 'Examples', 'Use'],
      ['Arithmetic symbols', '+, -, *, /, %, **, //', 'Calculations'],
      ['Assignment and comparison', '=, ==, !=, >, <, >=, <=', 'Store and compare values'],
      ['Grouping symbols', '( ), [ ], { }', 'Function calls, lists, dictionaries, blocks of data'],
      ['Punctuation', 'comma, dot, colon, semicolon', 'Separate values and define blocks'],
      ['String quotes', 'single quote and double quote', 'Create string values'],
      ['Comment symbol', '#', 'Write comments']
    ] },
    { type: 'code', text: 'a = 10 + 5\nprint("Total:", a)\n# This is a comment' },
    { type: 'heading', text: 'Whitespace Characters' },
    { type: 'paragraph', text: 'Whitespace characters improve readability. In Python, indentation whitespace is very important because it defines blocks of code.' },
    { type: 'list', items: ['Space', 'Tab', 'Newline'] },
    { type: 'code', text: 'if marks >= 35:\n    print("Pass")\nelse:\n    print("Fail")' },
    { type: 'heading', text: 'Unicode Characters' },
    { type: 'paragraph', text: 'Python supports Unicode characters inside strings. This means we can store text from many languages and symbols.' },
    { type: 'code', text: 'message = "తెలుగు"\nsymbol = "₹"\nprint(message, symbol)' },
    { type: 'heading', text: 'Escape Characters' },
    { type: 'paragraph', text: 'Escape characters are special character combinations used inside strings for formatting output.' },
    { type: 'table', rows: [
      ['Escape Character', 'Meaning'],
      ['\\n', 'New line'],
      ['\\t', 'Tab space'],
      ['\\\\', 'Backslash'],
      ['\\"', 'Double quote'],
      ["\\'", 'Single quote']
    ] },
    { type: 'code', text: 'print("Hello\\nPython")\nprint("Name\\tMarks")\nprint("KCDHANUNJAY INFOSYS")' },
    { type: 'heading', text: 'Real-time Usage' },
    { type: 'paragraph', text: 'Python character set helps students write valid variable names, strings, comments, expressions, and formatted output in lab programs and mini projects.' },
    { type: 'heading', text: 'Conclusion' },
    { type: 'paragraph', text: 'Python programs are built using letters, digits, special symbols, whitespace, Unicode characters, and escape characters. Understanding the character set is the first step to writing correct Python syntax.' }
  ],
  'basic-structure': [
    { type: 'heading', text: 'Python Basic Program Structure' },
    { type: 'paragraph', text: 'A Python program can be divided into different sections. Each section has a specific purpose and helps students write neat, readable, and reusable programs.' },
    { type: 'table', rows: [
      ['Section', 'Definition'],
      ['Documentation Section', 'Used to write program details such as program name, author name, date, and description. It is written using comments or docstrings.'],
      ['Import Section', 'Used to import built-in or external modules like math, random, or datetime.'],
      ['Definition / Constant Section', 'Used to define constant values. In Python, constants are usually written in capital letters.'],
      ['Global Declaration Section', 'Used to declare global variables that can be used throughout the program.'],
      ['Function Definition Section', 'Used to define user-defined functions using def.'],
      ['Main Execution Section', 'Python executes statements from top to bottom. Commonly, main logic is written inside if __name__ == "__main__":.'],
      ['Declaration / Initialization Section', 'Used to create variables and assign initial values.'],
      ['Execution Section', 'Contains statements that perform input, processing, and output operations.'],
      ['Sub Program / Function Call Section', 'Used to call user-defined functions.']
    ] },
    { type: 'heading', text: 'General Structure' },
    { type: 'code', text: '"""\nDocumentation Section\n"""\n# Import Section\nimport math\n\n# Definition / Constant Section\nCOLLEGE = "KCD Infosys"\n\n# Global Declaration Section\nyear = 2026\n\n# Function Definition Section\ndef display():\n    print("This is a user-defined function")\n\n# Main Execution Section\nif __name__ == "__main__":\n    number = 5\n    print("Number =", number)\n    display()' },
    { type: 'heading', text: 'Real-time Usage' },
    { type: 'paragraph', text: 'Students can use this structure for calculator programs, student record systems, marks reports, and menu-driven Python mini projects.' }
  ],
  'tokens': [
    { type: 'heading', text: 'Python Tokens' },
    { type: 'paragraph', text: 'In Python, the smallest individual units in a program are called tokens. Python reads a program by separating it into tokens such as names, values, operators, and special symbols.' },
    { type: 'paragraph', text: 'Example:' },
    { type: 'code', text: 'a = 10\nprint(a)' },
    { type: 'paragraph', text: 'Tokens in this example include a, =, 10, print, (, and ).' },
    { type: 'table', rows: [
      ['Token', 'Token Type', 'Purpose'],
      ['a', 'Identifier', 'Variable name'],
      ['=', 'Operator', 'Assignment operator'],
      ['10', 'Literal', 'Integer value'],
      ['print', 'Identifier / built-in function name', 'Displays output'],
      ['(', ')', 'Delimiters', 'Group function argument']
    ] },
    { type: 'heading', text: 'Types of Python Tokens' },
    { type: 'table', rows: [
      ['Token Type', 'Meaning', 'Examples'],
      ['Keywords', 'Reserved words with predefined meaning', 'if, else, for, while, True, False, None, def'],
      ['Identifiers', 'Names given to variables, functions, and classes', 'marks, average, student_name'],
      ['Literals', 'Fixed values used directly in a program', '10, 3.14, "Hello", True, [1, 2, 3]'],
      ['Operators', 'Symbols or words used to perform operations', '+, -, *, /, and, or, in'],
      ['Delimiters', 'Special symbols that separate or group code', '( ), [ ], { }, :, comma']
    ] },
    { type: 'heading', text: '1. Keywords' },
    { type: 'paragraph', text: 'Keywords are reserved words. Python already gives special meaning to these words, so they cannot be used as variable names.' },
    { type: 'code', text: 'if marks >= 35:\n    print("Pass")\nelse:\n    print("Fail")' },
    { type: 'paragraph', text: 'In this example, if and else are keywords.' },
    { type: 'heading', text: '2. Identifiers' },
    { type: 'paragraph', text: 'Identifiers are names given to variables, functions, classes, modules, and objects.' },
    { type: 'code', text: 'student_name = "Ravi"\ncourse_name = "Python"\ndef display_result():\n    print(student_name, course_name)' },
    { type: 'paragraph', text: 'In this example, student_name, course_name, and display_result are identifiers.' },
    { type: 'heading', text: '3. Literals' },
    { type: 'paragraph', text: 'Literals are fixed values written directly in a program.' },
    { type: 'table', rows: [
      ['Literal Type', 'Example'],
      ['Integer', 'marks = 90'],
      ['Float', 'percentage = 85.5'],
      ['String', 'name = "Ravi"'],
      ['Boolean', 'is_pass = True'],
      ['List', 'marks_list = [80, 90, 95]'],
      ['Dictionary', 'student = {"uid": 4501218, "course": "Python"}'],
      ['None', 'result = None']
    ] },
    { type: 'heading', text: '4. Operators' },
    { type: 'paragraph', text: 'Operators are symbols or words used to perform calculations, comparisons, assignments, and logical operations.' },
    { type: 'code', text: 'marks = 90\nattendance = 85\nis_eligible = marks >= 35 and attendance >= 75\nprint(is_eligible)' },
    { type: 'paragraph', text: 'In this example, =, >=, and are operators.' },
    { type: 'heading', text: '5. Delimiters' },
    { type: 'paragraph', text: 'Delimiters are symbols used to separate, group, or structure Python code.' },
    { type: 'table', rows: [
      ['Delimiter', 'Use', 'Example'],
      ['( )', 'Function call or grouping', 'print("Hello")'],
      ['[ ]', 'List or indexing', 'marks[0]'],
      ['{ }', 'Dictionary or set', '{"name": "Ravi"}'],
      [':', 'Starts a block', 'if marks >= 35:'],
      [',', 'Separates values', 'print(name, marks)'],
      ['.', 'Accesses object members', 'name.upper()']
    ] },
    { type: 'heading', text: 'Example Program' },
    { type: 'code', text: 'marks = 90\nif marks > 35:\n    print("Pass")' },
    { type: 'heading', text: 'Token Breakdown of Example Program' },
    { type: 'table', rows: [
      ['Token', 'Type'],
      ['marks', 'Identifier'],
      ['=', 'Operator'],
      ['90', 'Integer literal'],
      ['if', 'Keyword'],
      ['>', 'Comparison operator'],
      ['35', 'Integer literal'],
      [':', 'Delimiter'],
      ['print', 'Built-in function name'],
      ['"Pass"', 'String literal'],
      ['( )', 'Delimiters']
    ] },
    { type: 'paragraph', text: 'Real-time Usage: Tokens help students understand Python syntax, identify errors, read compiler/interpreter messages, and write clean programs for marks calculation, student records, and mini projects.' }
  ],
  'variables': [
    { type: 'heading', text: 'Python Variables' },
    { type: 'paragraph', text: 'A variable is a name used to store data. Python variables are dynamically typed, so we do not need to declare the data type separately.' },
    { type: 'paragraph', text: 'Example:' },
    { type: 'code', text: 'a = 10\nname = "Dhanunjay"\nmarks = 95.5\nprint(a, name, marks)' },
    { type: 'heading', text: 'Rules for Variables in Python' },
    { type: 'list', items: ['Must start with a letter or underscore', 'Cannot start with a number', 'No spaces allowed', 'Case-sensitive, so a and A are different', 'No need to declare type before assigning value'] },
    { type: 'heading', text: 'Types of Variable Values' },
    { type: 'table', rows: [
      ['Type', 'Example'],
      ['int', 'a = 10'],
      ['float', 'x = 3.14'],
      ['str', 's = "Hello"'],
      ['bool', 'flag = True'],
      ['list', 'l = [1, 2, 3]'],
      ['dict', 'd = {"a": 1}']
    ] },
    { type: 'heading', text: 'Common Variable Examples' },
    { type: 'code', text: 'a, b = 5, 10\nprint(a, b)\n\na, b = b, a\nprint(a, b)\n\nstudent_uid = 4501218\ncourse_name = "Python"\nprint(student_uid, course_name)' },
    { type: 'paragraph', text: 'Real-time Usage: Variables store student UID, name, course, marks, fee, attendance, and verification status in KCDHANUNJAY INFOSYS programs.' }
  ],
  'keywords': [
    { type: 'heading', text: 'Python Keywords' },
    { type: 'paragraph', text: 'Python keywords are reserved words with predefined meanings. They cannot be used as variable names because Python already uses them for program control and structure.' },
    { type: 'table', rows: [
      ['No', 'Keyword', 'Definition', 'Example'],
      ['1', 'if', 'Condition check', 'if x > 5:'],
      ['2', 'else', 'Alternative condition', 'else:'],
      ['3', 'elif', 'Multiple conditions', 'elif x == 5:'],
      ['4', 'for', 'Loop', 'for i in range(5):'],
      ['5', 'while', 'Condition loop', 'while x < 5:'],
      ['6', 'break', 'Exit loop', 'break'],
      ['7', 'continue', 'Skip iteration', 'continue'],
      ['8', 'pass', 'Empty block', 'pass'],
      ['9', 'return', 'Return value', 'return x'],
      ['10', 'def', 'Function definition', 'def show():'],
      ['11', 'lambda', 'Anonymous function', 'lambda x: x + 1'],
      ['12', 'class', 'Blueprint for object', 'class Student:'],
      ['13', 'import', 'Import module', 'import math'],
      ['14', 'from', 'Import specific item', 'from math import sqrt'],
      ['15', 'as', 'Alias name', 'import math as m'],
      ['16', 'try / except', 'Exception handling', 'try: ... except:'],
      ['17', 'and / or / not', 'Logical operators', 'a and b'],
      ['18', 'in / is', 'Membership and identity', 'x in list']
    ] },
    { type: 'heading', text: 'Keyword Classification' },
    { type: 'list', items: ['Condition keywords: if, elif, else', 'Loop keywords: for, while, break, continue', 'Function keywords: def, return, lambda', 'Class keywords: class', 'Exception keywords: try, except, finally, raise', 'Logical keywords: and, or, not'] },
    { type: 'paragraph', text: 'Real-time Usage: Keywords are used in every Python program for decisions, loops, functions, classes, and error handling.' }
  ],
  'datatypes': [
    { type: 'heading', text: 'Python Data Types' },
    { type: 'paragraph', text: 'Data types in Python specify what type of value a variable can store. Python is dynamically typed, so the data type is decided automatically based on the assigned value.' },
    { type: 'code', text: 'age = 20\nmarks = 95.5\ngrade = "A"\npassed = True' },
    { type: 'heading', text: 'Classification of Python Data Types' },
    { type: 'list', items: ['Numeric Data Types: int, float, complex', 'Sequence Data Types: str, list, tuple, range', 'Mapping Data Type: dict', 'Set Data Types: set, frozenset', 'Boolean Data Type: bool', 'Binary Data Types: bytes, bytearray, memoryview', 'None Data Type: NoneType'] },
    { type: 'table', rows: [
      ['Data Type', 'Storage / Meaning', 'Example'],
      ['int', 'Arbitrary precision whole number', 'age = 20'],
      ['float', 'Decimal value, usually 8 bytes', 'marks = 95.5'],
      ['complex', 'Two float values', 'z = 2 + 3j'],
      ['str', 'Sequence of characters', 'name = "Dhanunjay"'],
      ['list', 'Ordered mutable collection', 'marks = [80, 90]'],
      ['tuple', 'Ordered immutable collection', 'point = (10, 20)'],
      ['dict', 'Key-value pairs', 'student = {"name": "Ravi"}'],
      ['set', 'Unique unordered values', '{1, 2, 3}'],
      ['bool', 'True or False', 'passed = True'],
      ['NoneType', 'No value', 'x = None']
    ] },
    { type: 'paragraph', text: 'Real-time Usage: Data types help store names, marks, lists of students, course dictionaries, pass/fail status, and empty values safely.' }
  ],
  'input-output': [
    { type: 'heading', text: 'Python Input Output' },
    { type: 'paragraph', text: 'Input means taking data from the user. Output means displaying data or result. Python mainly uses input() for input and print() for output.' },
    { type: 'heading', text: 'Basic Input and Output' },
    { type: 'code', text: 'name = input("Enter your name: ")\nprint("Hello", name)' },
    { type: 'heading', text: 'Integer and Float Input' },
    { type: 'code', text: 'num = int(input("Enter a number: "))\nprice = float(input("Enter price: "))\nprint(num, price)' },
    { type: 'heading', text: 'Multiple Inputs' },
    { type: 'code', text: 'a, b = map(int, input("Enter two numbers: ").split())\nprint("Sum:", a + b)' },
    { type: 'heading', text: 'List Input' },
    { type: 'code', text: 'numbers = list(map(int, input("Enter numbers: ").split()))\nprint("List:", numbers)' },
    { type: 'heading', text: 'Formatted Output' },
    { type: 'code', text: 'name = "Dhanunjay"\nage = 25\nprint(f"Name: {name}, Age: {age}")\nprint("Name: {}, Age: {}".format(name, age))' },
    { type: 'heading', text: 'File Input and Output' },
    { type: 'code', text: 'with open("data.txt", "w") as f:\n    f.write("Hello Python")\n\nwith open("data.txt", "r") as f:\n    print(f.read())' },
    { type: 'paragraph', text: 'Real-time Usage: Input and output are used for student forms, marks entry, course registration, receipt display, and file-based reports.' }
  ],
  'operators': [
    { type: 'heading', text: 'Python Operators' },
    { type: 'paragraph', text: 'Python operators are symbols or special words used to perform operations on values and variables. They help calculate values, compare data, combine conditions, update variables, check lists, and make decisions in programs.' },
    { type: 'heading', text: '1. Arithmetic Operators' },
    { type: 'paragraph', text: 'Used for mathematical calculations.' },
    { type: 'table', rows: [
      ['Operator', 'Meaning'],
      ['+', 'Addition'],
      ['-', 'Subtraction'],
      ['*', 'Multiplication'],
      ['/', 'Division'],
      ['%', 'Modulus'],
      ['**', 'Power'],
      ['//', 'Floor division']
    ] },
    { type: 'code', text: 'def arithmetic_example(a, b):\n    print("Addition:", a + b)\n    print("Subtraction:", a - b)\n    print("Multiplication:", a * b)\n    print("Division:", a / b)\n    print("Modulus:", a % b)\n    print("Power:", a ** b)\n    print("Floor Division:", a // b)\n\narithmetic_example(10, 3)' },
    { type: 'paragraph', text: 'Real-time Usage: Arithmetic operators are used for marks totals, fee calculations, averages, discounts, and percentage calculation programs.' },
    { type: 'heading', text: '2. Comparison Operators' },
    { type: 'paragraph', text: 'Used to compare two values.' },
    { type: 'table', rows: [
      ['Operator', 'Meaning'],
      ['>', 'Greater than'],
      ['<', 'Less than'],
      ['>=', 'Greater than or equal'],
      ['<=', 'Less than or equal'],
      ['==', 'Equal'],
      ['!=', 'Not equal']
    ] },
    { type: 'code', text: 'def comparison_example(marks):\n    print("Pass:", marks >= 35)\n    print("Full Marks:", marks == 100)\n    print("Fail:", marks < 35)\n\ncomparison_example(85)' },
    { type: 'paragraph', text: 'Real-time Usage: Comparison operators are used for pass/fail checking, eligibility tests, age validation, and comparing student scores.' },
    { type: 'heading', text: '3. Logical Operators' },
    { type: 'paragraph', text: 'Used to combine conditions.' },
    { type: 'table', rows: [
      ['Operator', 'Meaning'],
      ['and', 'True if both conditions are true'],
      ['or', 'True if any one condition is true'],
      ['not', 'Reverses condition result']
    ] },
    { type: 'code', text: 'def logical_example(marks, attendance):\n    eligible = marks >= 35 and attendance >= 75\n    print("Eligible:", eligible)\n\nlogical_example(85, 90)' },
    { type: 'paragraph', text: 'Real-time Usage: Logical operators are used for scholarship eligibility, attendance validation, login checks, and multi-condition filtering.' },
    { type: 'heading', text: '4. Assignment Operators' },
    { type: 'paragraph', text: 'Used to assign or update values.' },
    { type: 'table', rows: [
      ['Operator', 'Meaning'],
      ['=', 'Assign'],
      ['+=', 'Add and assign'],
      ['-=', 'Subtract and assign'],
      ['*=', 'Multiply and assign'],
      ['/=', 'Divide and assign']
    ] },
    { type: 'code', text: 'def assignment_example(fee):\n    fee += 500\n    print("Updated Fee:", fee)\n\nassignment_example(1500)' },
    { type: 'paragraph', text: 'Real-time Usage: Assignment operators are used to update fees, marks, counters, stock values, and running totals.' },
    { type: 'heading', text: '5. Membership Operators' },
    { type: 'paragraph', text: 'Used to check whether a value exists in a sequence.' },
    { type: 'table', rows: [
      ['Operator', 'Meaning'],
      ['in', 'Value exists'],
      ['not in', 'Value does not exist']
    ] },
    { type: 'code', text: 'def membership_example(courses):\n    print("Python Available:", "Python" in courses)\n    print("HTML Not Available:", "HTML" not in courses)\n\nmembership_example(["C", "Python", "Java"])' },
    { type: 'paragraph', text: 'Real-time Usage: Membership operators are used to search course names, check student IDs in a list, and validate selected options.' },
    { type: 'heading', text: '6. Identity Operators' },
    { type: 'paragraph', text: 'Used to check whether two variables refer to the same object.' },
    { type: 'table', rows: [
      ['Operator', 'Meaning'],
      ['is', 'Same object'],
      ['is not', 'Not same object']
    ] },
    { type: 'code', text: 'def identity_example():\n    a = [1, 2, 3]\n    b = a\n    c = [1, 2, 3]\n\n    print("a is b:", a is b)\n    print("a is c:", a is c)\n    print("a is not c:", a is not c)\n\nidentity_example()' },
    { type: 'paragraph', text: 'Real-time Usage: Identity operators are used to understand object references, memory behavior, and list/object handling in Python projects.' },
    { type: 'heading', text: '7. Bitwise Operators' },
    { type: 'paragraph', text: 'Used to perform operations on binary values.' },
    { type: 'table', rows: [
      ['Operator', 'Meaning'],
      ['&', 'AND'],
      ['|', 'OR'],
      ['^', 'XOR'],
      ['~', 'NOT'],
      ['<<', 'Left shift'],
      ['>>', 'Right shift']
    ] },
    { type: 'code', text: 'def bitwise_example(a, b):\n    print("AND:", a & b)\n    print("OR:", a | b)\n    print("XOR:", a ^ b)\n    print("NOT a:", ~a)\n    print("Left Shift:", a << 1)\n    print("Right Shift:", a >> 1)\n\nbitwise_example(5, 3)' },
    { type: 'paragraph', text: 'Real-time Usage: Bitwise operators are used in low-level programming, permissions, flags, masks, and binary data operations.' },
    { type: 'heading', text: '8. Ternary Operator' },
    { type: 'paragraph', text: 'Used to write short if else decisions.' },
    { type: 'table', rows: [
      ['Operator', 'Meaning'],
      ['value_if_true if condition else value_if_false', 'Short decision']
    ] },
    { type: 'code', text: 'def ternary_example(marks):\n    result = "Pass" if marks >= 35 else "Fail"\n    print("Result:", result)\n\nternary_example(85)' },
    { type: 'paragraph', text: 'Real-time Usage: The ternary operator is used for quick result display, status messages, grade labels, and simple yes/no decisions.' }
  ],
  'syntax': [
    { type: 'heading', text: 'Python Syntax' },
    { type: 'paragraph', text: 'Python syntax means the set of rules used to write Python programs correctly. Python code is simple and readable because it uses indentation, clear statements, input/output functions, naming rules, and PEP 8 coding style.' },
    { type: 'heading', text: 'Indentation' },
    { type: 'paragraph', text: 'Indentation means spaces at the beginning of a line. In Python, indentation is compulsory because it defines code blocks.' },
    { type: 'paragraph', text: 'Example:' },
    { type: 'code', text: 'age = 18\nif age >= 18:\n    print("Eligible")\nelse:\n    print("Not eligible")' },
    { type: 'paragraph', text: 'Real-time Usage: Students can write clean condition, loop, and function programs without using braces like C, C++, or Java.' },
    { type: 'heading', text: 'Readable Code Notes' },
    { type: 'paragraph', text: 'Readable code uses clear names, proper spacing, and simple structure so students can understand the program flow easily.' },
    { type: 'paragraph', text: 'Example:' },
    { type: 'code', text: 'institute_name = "KCDHANUNJAY INFOSYS"\nprint(institute_name)' },
    { type: 'paragraph', text: 'Real-time Usage: Students can keep lab programs, mini projects, and record submissions clean and easy to read.' },
    { type: 'heading', text: 'Statements' },
    { type: 'paragraph', text: 'A statement is a complete instruction given to Python. Each statement performs one task such as assigning a value, printing output, or checking a condition.' },
    { type: 'paragraph', text: 'Example:' },
    { type: 'code', text: 'student_name = "Ravi"\nmarks = 85\nprint(student_name, marks)' },
    { type: 'paragraph', text: 'Real-time Usage: Statements are used to store student names, marks, course names, and verification status.' },
    { type: 'heading', text: 'Input and Output' },
    { type: 'paragraph', text: 'Input means taking data from the user. Output means displaying result on the screen. Python uses input() for input and print() for output.' },
    { type: 'paragraph', text: 'Example:' },
    { type: 'code', text: 'name = input("Enter student name: ")\ncourse = input("Enter course: ")\nprint("Student:", name)\nprint("Course:", course)' },
    { type: 'paragraph', text: 'Real-time Usage: KCDHANUNJAY INFOSYS students can collect name, UID, mobile number, course, and marks in practice programs.' },
    { type: 'heading', text: 'Naming Rules' },
    { type: 'paragraph', text: 'Variable and function names should be meaningful. Names can contain letters, digits, and underscore, but they cannot start with a digit.' },
    { type: 'paragraph', text: 'Example:' },
    { type: 'code', text: 'student_uid = 4501218\ncourse_name = "Python"\nstudent_name = "Ravi"' },
    { type: 'paragraph', text: 'Real-time Usage: Good names make student projects easy to read, debug, and explain.' },
    { type: 'heading', text: 'PEP 8 Basics' },
    { type: 'paragraph', text: 'PEP 8 is the style guide for writing clean Python code. It suggests proper indentation, naming style, line spacing, and readable formatting.' },
    { type: 'paragraph', text: 'Example:' },
    { type: 'code', text: 'def calculate_total(theory_marks, practical_marks):\n    return theory_marks + practical_marks' },
    { type: 'paragraph', text: 'Real-time Usage: PEP 8 helps students write professional-looking code for lab records, projects, and interviews.' },
    { type: 'heading', text: 'Conclusion' },
    { type: 'paragraph', text: 'Python syntax is easy to learn because it is close to English and uses indentation for structure. If students understand indentation, comments, statements, input/output, naming rules, and PEP 8 basics, they can write clean and correct Python programs.' }
  ],
  'setup': [
    { type: 'heading', text: 'Python Setup' },
    { type: 'paragraph', text: 'Python setup means preparing the computer to write, run, test, and manage Python programs. It includes installing Python, setting the PATH, choosing an editor, using pip for packages, and creating a virtual environment for projects.' },
    { type: 'heading', text: 'Install Python' },
    { type: 'paragraph', text: 'Python must be installed before running any Python program. The installer provides the Python interpreter, which executes Python code line by line.' },
    { type: 'paragraph', text: 'Example:' },
    { type: 'code', text: 'python --version' },
    { type: 'paragraph', text: 'Real-time Usage: Students can check whether Python is installed before practicing programs in lab systems or personal laptops.' },
    { type: 'heading', text: 'PATH Setup' },
    { type: 'paragraph', text: 'PATH setup allows Python commands to run from Command Prompt or terminal from any folder.' },
    { type: 'paragraph', text: 'Example:' },
    { type: 'code', text: 'python program.py' },
    { type: 'paragraph', text: 'Real-time Usage: KCDHANUNJAY INFOSYS students can run Python files quickly without opening the Python installation folder every time.' },
    { type: 'heading', text: 'IDLE' },
    { type: 'paragraph', text: 'IDLE is Python\\u2019s built-in editor. It is useful for beginners to write and test small Python programs.' },
    { type: 'paragraph', text: 'Example:' },
    { type: 'code', text: 'print("Welcome to Python")' },
    { type: 'paragraph', text: 'Real-time Usage: Beginners can practice basic programs like variables, input/output, and conditions using IDLE.' },
    { type: 'heading', text: 'VS Code' },
    { type: 'paragraph', text: 'VS Code is a popular code editor used for Python development. It supports extensions, debugging, terminal access, and project folders.' },
    { type: 'paragraph', text: 'Real-time Usage: Students can create Python mini projects, organize files, and run programs professionally.' },
    { type: 'heading', text: 'pip' },
    { type: 'paragraph', text: 'pip is Python\\u2019s package manager. It is used to install external libraries.' },
    { type: 'paragraph', text: 'Example:' },
    { type: 'code', text: 'pip install requests' },
    { type: 'paragraph', text: 'Real-time Usage: Students can install libraries for web APIs, data analysis, automation, and AI projects.' },
    { type: 'heading', text: 'Virtual Environment' },
    { type: 'paragraph', text: 'A virtual environment keeps project packages separate from the main Python installation.' },
    { type: 'paragraph', text: 'Example:' },
    { type: 'code', text: 'python -m venv myenv' },
    { type: 'paragraph', text: 'Real-time Usage: Each student project can maintain its own required libraries without disturbing other projects.' },
    { type: 'heading', text: 'Conclusion' },
    { type: 'paragraph', text: 'Python setup is the first step in Python programming. Once Python, PATH, editor, pip, and virtual environment are ready, students can write programs, install libraries, and build real-time projects smoothly.' }
  ],
  'intro-python': [
    { type: 'heading', text: 'Python: Brief History' },
    { type: 'paragraph', text: 'Python is a high-level, general-purpose programming language developed by Guido van Rossum.' },
    { type: 'paragraph', text: 'Birth details:' },
    { type: 'table', rows: [
      ['Item', 'Details'],
      ['Language name', 'Python'],
      ['Developed by', 'Guido van Rossum'],
      ['Country', 'Netherlands'],
      ['Organization', 'Centrum Wiskunde & Informatica'],
      ['First released', '1991'],
      ['Earlier development started', '1989'],
      ['Based on', 'ABC language'],
      ['Main idea', 'Simple and readable programming']
    ] },
    { type: 'heading', text: 'Latest Update' },
    { type: 'table', rows: [
      ['Item', 'Details'],
      ['Latest version path', 'Python 3.14 series'],
      ['Learning path', 'Python 3.12+ basics, Python 3.13/3.14 modern features, virtual environments, pip, data and AI libraries'],
      ['Modern focus', 'Readable syntax, type hints, pattern matching, virtual environments, automation, web APIs, data science, machine learning and AI projects']
    ] },
    { type: 'paragraph', text: 'Python was created to be easy to read, easy to write, and powerful for many types of programming. The name Python came from the British comedy show Monty Python\\u2019s Flying Circus, not from the snake.' },
    { type: 'heading', text: 'Why Python?' },
    { type: 'paragraph', text: 'Python was developed because programmers needed a language that was:' },
    { type: 'list', items: ['Simple and easy to learn', 'Readable like English', 'Useful for many fields', 'Faster for development', 'Good for beginners and professionals', 'Strong in automation and data processing'] },
    { type: 'paragraph', text: 'Real-time example:If a teacher wants to calculate student marks from an Excel file automatically, Python can read the file, calculate results, and generate a report quickly.' },
    { type: 'heading', text: 'Features of Python' },
    { type: 'heading', text: 'Simple and easy to learn' },
    { type: 'paragraph', text: 'Python syntax is close to English.' },
    { type: 'code', text: 'print("Hello, World!")' },
    { type: 'heading', text: 'Readable code' },
    { type: 'paragraph', text: 'Python uses indentation to make code clear.' },
    { type: 'code', text: 'age = 18\nif age >= 18:\nprint("Eligible to vote")\nelse:\nprint("Not eligible")' },
    { type: 'heading', text: 'Interpreted language' },
    { type: 'paragraph', text: 'Python runs line by line using an interpreter.' },
    { type: 'heading', text: 'Dynamically typed' },
    { type: 'paragraph', text: 'No need to declare variable types.' },
    { type: 'code', text: 'x = 10\nx = "Hello"\nx = 15.5' },
    { type: 'heading', text: 'Object-oriented' },
    { type: 'paragraph', text: 'Python supports classes and objects.' },
    { type: 'code', text: 'class Student:\ndef __init__(self, name):\nself.name = name\ndef display(self):\nprint("Student name:", self.name)\ns1 = Student("Ravi")\ns1.display()' },
    { type: 'heading', text: 'Large standard library' },
    { type: 'paragraph', text: 'Python has built-in modules for files, dates, math, internet, databases, and more.' },
    { type: 'heading', text: 'Portable' },
    { type: 'paragraph', text: 'Python programs can run on Windows, Linux, and macOS if Python is installed.' },
    { type: 'heading', text: 'Supports many programming styles' },
    { type: 'paragraph', text: 'Python supports procedural, object-oriented, and functional programming.' },
    { type: 'heading', text: 'Advantages of Python' },
    { type: 'list', items: ['Easy to learn and use', 'Code is short and readable', 'Large library support', 'Huge community support', 'Good for beginners', 'Faster development', 'Used in many industries', 'Supports automation, AI, web development, and data science'] },
    { type: 'paragraph', text: 'Real-time example:A company can use Python to automatically send emails, process invoices, analyze sales data, and generate charts.' },
    { type: 'heading', text: 'Disadvantages of Python' },
    { type: 'list', items: ['Slower than C, C++, and Java in execution speed', 'Uses more memory', 'Not ideal for low-level system programming', 'Not commonly used for mobile app development', 'Runtime errors can happen due to dynamic typing', 'Requires Python interpreter'] },
    { type: 'paragraph', text: 'Real-time example:For developing a high-speed game engine, C++ is usually preferred over Python because C++ runs faster.' },
    { type: 'heading', text: 'Limitations of Python' },
    { type: 'list', items: ['Less suitable for very high-performance applications', 'Not best for memory-limited devices', 'Weak in mobile app development compared to Kotlin or Swift', 'Depends on indentation, so spacing mistakes can cause errors', 'Cannot directly control hardware like C', 'Some applications need external libraries'] },
    { type: 'paragraph', text: 'Real-time example:A traffic signal controller inside a small embedded chip may use C instead of Python because the chip may have very limited memory.' },
    { type: 'heading', text: 'Applications of Python' },
    { type: 'table', rows: [
      ['Application', 'Examples'],
      ['Web development', 'Django, Flask websites'],
      ['Data science', 'data analysis, reports, dashboards'],
      ['Artificial intelligence', 'chatbots, image recognition, recommendation systems'],
      ['Machine learning', 'prediction models, fraud detection'],
      ['Automation', 'sending emails, renaming files, reading Excel sheets'],
      ['Cybersecurity', 'security testing tools, log analysis'],
      ['Game development', 'simple games using Pygame'],
      ['Desktop applications', 'GUI tools using Tkinter or PyQt'],
      ['Scientific computing', 'simulations, calculations, research tools'],
      ['Internet of Things', 'Raspberry Pi projects, smart home automation']
    ] },
    { type: 'heading', text: 'Simple Real-Time Example of Python Use' },
    { type: 'paragraph', text: 'A simple student marks result system can be written in Python.' },
    { type: 'code', text: 'name = "Ravi"\nmarks = 85\nif marks >= 35:\nprint(name, "passed")\nelse:\nprint(name, "failed")' },
    { type: 'paragraph', text: 'Output:' },
    { type: 'code', text: 'Ravi passed' },
    { type: 'paragraph', text: 'Another example: calculating shopping bill.' },
    { type: 'code', text: 'price = 500\nquantity = 2\ntotal = price * quantity\nprint("Total amount:", total)' },
    { type: 'paragraph', text: 'Output:' },
    { type: 'code', text: 'Total amount: 1000' },
    { type: 'heading', text: 'Conclusion' },
    { type: 'paragraph', text: 'Python is a simple, powerful, and beginner-friendly programming language. It is widely used in web development, automation, data science, artificial intelligence, machine learning, cybersecurity, and IoT. Python is popular because its code is easy to read and it helps developers build applications quickly.' }
  ]
};

function pythonSubtopicDefinition(topicTitle, subtopic) {
  const lower = subtopic.toLowerCase();
  if (lower.includes('class') || lower.includes('object')) {
    return `${subtopic} explains how Python groups data and behavior together so a program can model real-world items like students, courses, certificates, and payments.`;
  }
  if (lower.includes('file') || lower.includes('csv') || lower.includes('json')) {
    return `${subtopic} explains how Python stores and reads data permanently, so information remains available even after the program closes.`;
  }
  if (lower.includes('database') || lower.includes('api') || lower.includes('sqlite') || lower.includes('requests')) {
    return `${subtopic} explains how Python connects with stored records or online services and converts that data into useful program output.`;
  }
  if (lower.includes('ai') || lower.includes('ml') || lower.includes('pandas') || lower.includes('numpy')) {
    return `${subtopic} introduces the data-processing foundation needed for analysis, charts, predictions, and beginner AI workflows.`;
  }
  if (lower.includes('error') || lower.includes('exception') || lower.includes('try')) {
    return `${subtopic} helps Python programs handle unexpected situations safely instead of stopping suddenly.`;
  }
  if (lower.includes('loop') || lower.includes('list') || lower.includes('set') || lower.includes('tuple') || lower.includes('dictionary')) {
    return `${subtopic} helps Python work with multiple values in an organized way, which is important for reports, records, and repeated processing.`;
  }
  return `${subtopic} is an important part of ${topicTitle}. It helps students write readable Python code, understand the output clearly, and apply the concept in real mini projects.`;
}

function pythonSubtopicUsage(topicTitle, subtopic) {
  const lower = `${topicTitle} ${subtopic}`.toLowerCase();
  if (lower.includes('file') || lower.includes('csv') || lower.includes('json')) {
    return 'Save student records, marks reports, fee receipts, certificates, and backup data in text, CSV, or JSON files.';
  }
  if (lower.includes('database') || lower.includes('api') || lower.includes('sqlite') || lower.includes('requests')) {
    return 'Build student verification, course record, certificate status, and dashboard programs connected to databases or web APIs.';
  }
  if (lower.includes('ai') || lower.includes('data') || lower.includes('pandas') || lower.includes('matplotlib')) {
    return 'Analyze marks, attendance, course admissions, and progress trends with tables, charts, and simple prediction ideas.';
  }
  if (lower.includes('project')) {
    return 'Combine input, conditions, loops, functions, files, OOP, and database concepts into a complete student-ready application.';
  }
  if (lower.includes('class') || lower.includes('object') || lower.includes('inherit') || lower.includes('polymorphism')) {
    return 'Represent Student, Course, Payment, Certificate, and Admin features as clean reusable program models.';
  }
  if (lower.includes('function') || lower.includes('module') || lower.includes('package')) {
    return 'Keep verification, marks calculation, receipt printing, and report generation as reusable code blocks.';
  }
  if (lower.includes('loop') || lower.includes('list') || lower.includes('tuple') || lower.includes('set') || lower.includes('dictionary')) {
    return 'Process many students, marks, course names, unique IDs, and structured records without repeating code manually.';
  }
  if (lower.includes('input') || lower.includes('output') || lower.includes('control') || lower.includes('operator')) {
    return 'Collect student details, check eligibility, calculate totals, and display clean output in lab programs.';
  }
  return 'Use the concept in KCDHANUNJAY INFOSYS lab programs, student utilities, certificate verification, and Python mini projects.';
}

function pythonTopicPracticeProgram(topicId) {
  const programs = {
    control: 'marks = int(input("Enter marks: "))\nattendance = int(input("Enter attendance: "))\n\nif marks >= 35 and attendance >= 75:\n    print("Eligible and Pass")\nelif marks >= 35:\n    print("Pass but attendance shortage")\nelse:\n    print("Fail")',
    loops: 'students = ["Ravi", "Sita", "Kiran"]\n\nfor index, name in enumerate(students, start=1):\n    print(index, name)\n\ncount = 1\nwhile count <= 3:\n    print("Practice program", count)\n    count += 1',
    strings: 'name = "  kcdhanunjay infosys  "\nclean_name = name.strip().title()\ncertificate = f"Certificate issued to {clean_name}"\n\nprint(clean_name)\nprint(certificate)',
    lists: 'marks = [82, 91, 76, 88]\nmarks.append(95)\n\nprint("Marks:", marks)\nprint("Highest:", max(marks))\nprint("Average:", sum(marks) / len(marks))',
    'tuples-sets': 'student = (4501218, "Ravi", "Python")\ncourses = {"C", "Python", "Java", "Python"}\n\nprint("Student:", student)\nprint("Unique courses:", courses)',
    dictionaries: 'student = {\n    "uid": 4501218,\n    "name": "Ravi",\n    "course": "Python",\n    "marks": 92\n}\n\nprint(student["name"], student.get("course"))',
    functions: 'def calculate_result(name, marks):\n    status = "Pass" if marks >= 35 else "Fail"\n    return f"{name}: {status}"\n\nprint(calculate_result("Ravi", 86))',
    modules: 'import math\nfrom datetime import date\n\nmarks = [80, 90, 95]\naverage = sum(marks) / len(marks)\nprint("Average:", math.ceil(average))\nprint("Date:", date.today())',
    files: 'students = ["4501218,Ravi,Python", "4501219,Sita,AI"]\n\nwith open("students.csv", "w", encoding="utf-8") as file:\n    for row in students:\n        file.write(row + "\\n")\n\nwith open("students.csv", "r", encoding="utf-8") as file:\n    print(file.read())',
    exceptions: 'try:\n    marks = int(input("Enter marks: "))\n    print("Marks:", marks)\nexcept ValueError:\n    print("Please enter numbers only.")\nfinally:\n    print("Result process completed.")',
    oop: 'class Student:\n    def __init__(self, uid, name, course):\n        self.uid = uid\n        self.name = name\n        self.course = course\n\n    def display(self):\n        print(self.uid, self.name, self.course)\n\nstudent = Student(4501218, "Ravi", "Python")\nstudent.display()',
    inheritance: 'class Course:\n    def show(self):\n        print("Course details")\n\nclass PythonCourse(Course):\n    def show(self):\n        print("Python course with projects")\n\ncourse = PythonCourse()\ncourse.show()',
    advanced: 'def log_result(function):\n    def wrapper(*args, **kwargs):\n        print("Starting calculation")\n        return function(*args, **kwargs)\n    return wrapper\n\n@log_result\ndef total(*marks):\n    return sum(marks)\n\nprint(total(80, 90, 95))',
    database: 'import sqlite3\n\nconnection = sqlite3.connect(":memory:")\ncursor = connection.cursor()\ncursor.execute("CREATE TABLE students(uid INTEGER, name TEXT)")\ncursor.execute("INSERT INTO students VALUES (?, ?)", (4501218, "Ravi"))\nprint(cursor.execute("SELECT * FROM students").fetchall())\nconnection.close()',
    'data-ai': 'marks = [80, 90, 95, 70]\naverage = sum(marks) / len(marks)\n\nif average >= 85:\n    print("High performance batch")\nelse:\n    print("Needs more practice")',
    projects: 'students = []\n\nwhile True:\n    choice = input("1.Add 2.View 3.Exit: ")\n    if choice == "1":\n        students.append(input("Enter student name: "))\n    elif choice == "2":\n        print(students)\n    elif choice == "3":\n        break'
  };
  return programs[topicId] || 'print("KCDHANUNJAY INFOSYS Python Practice")';
}

const pythonGeneratedDocumentBlocks = Object.fromEntries(languageConfigs.python.topics.map(([topicId, title, subtopics]) => {
  const extras = pythonTopicExtras[topicId] || {};
  const blocks = [
    { type: 'heading', text: `${title} - Complete Python Notes` },
    { type: 'paragraph', text: extras.concept || `${title} is a core Python topic for writing clean, practical, project-ready programs.` },
    { type: 'heading', text: 'Learning Flow' },
    { type: 'list', items: extras.flow || ['Understand concept', 'Write syntax', 'Run example', 'Apply in mini project'] },
    { type: 'heading', text: 'Topic Table' },
    { type: 'table', rows: [
      ['Section', 'What Students Learn'],
      ['Definition', `Meaning and purpose of ${title}`],
      ['Syntax', 'How to write the concept correctly in Python'],
      ['Example', 'Small runnable program with clear output'],
      ['Real-time Usage', 'How to use it in student records, automation, data, or projects']
    ] },
    { type: 'heading', text: 'Important Subtopics' },
    { type: 'table', rows: [
      ['No', 'Subtopic', 'Main Use'],
      ...subtopics.map((subtopic, index) => [String(index + 1), subtopic, pythonSubtopicUsage(title, subtopic)])
    ] }
  ];

  subtopics.forEach((subtopic, index) => {
    blocks.push(
      { type: 'heading', text: `${index + 1}. ${subtopic}` },
      { type: 'paragraph', text: pythonSubtopicDefinition(title, subtopic) },
      { type: 'paragraph', text: 'Example:' },
      { type: 'code', text: pythonExampleFor(title, subtopic) },
      { type: 'paragraph', text: `Real-time Usage: ${pythonSubtopicUsage(title, subtopic)}` }
    );
  });

  blocks.push(
    { type: 'heading', text: 'Practice Program' },
    { type: 'code', text: pythonTopicPracticeProgram(topicId) },
    { type: 'heading', text: 'Common Mistakes to Avoid' },
    { type: 'list', items: [
      'Do not ignore indentation; Python blocks depend on spaces.',
      'Use meaningful names like student_name, total_marks, course_list, and uid.',
      'Test with small input first, then add file, database, or project features.',
      'Read error messages carefully because they usually point to the exact line.'
    ] },
    { type: 'heading', text: 'Mini Project Task' },
    { type: 'paragraph', text: `Create a small ${title} based program using KCDHANUNJAY INFOSYS sample data: UID 4501218, course Python, marks 92, and certificate status Verified.` },
    { type: 'heading', text: 'Conclusion' },
    { type: 'paragraph', text: `${title} becomes powerful when students practice the syntax, understand the output, and connect it to real applications like records, reports, dashboards, APIs, and Python projects.` }
  );

  return [topicId, blocks];
}));

const pythonCompleteDocumentBlocks = { ...pythonGeneratedDocumentBlocks, ...pythonTopicDocumentBlocks };

const firstEightTopicDocuments = Object.fromEntries(['c', 'cpp', 'java', 'javascript'].map((languageId) => {
  const language = languageConfigs[languageId];
  const samples = {
    c: {
      first: '#include <stdio.h>\nint main(){\n    printf("KCDHANUNJAY INFOSYS");\n    return 0;\n}',
      variable: 'int marks = 95;\nfloat percentage = 86.5;\nchar grade = \'A\';',
      input: 'int marks;\nprintf("Enter marks: ");\nscanf("%d", &marks);\nprintf("Marks = %d", marks);',
      operator: 'int total = theory + practical;\nif (total >= 35) printf("Pass");'
    },
    cpp: {
      first: '#include <iostream>\nusing namespace std;\nint main(){\n    cout << "KCDHANUNJAY INFOSYS";\n    return 0;\n}',
      variable: 'int marks = 95;\nstring course = "C++";\nbool passed = true;',
      input: 'string name;\ncout << "Enter name: ";\ngetline(cin, name);\ncout << name;',
      operator: 'int total = theory + practical;\ncout << (total >= 35 ? "Pass" : "Fail");'
    },
    java: {
      first: 'class Main {\n    public static void main(String[] args){\n        System.out.println("KCDHANUNJAY INFOSYS");\n    }\n}',
      variable: 'int marks = 95;\nString course = "Java";\nboolean passed = true;',
      input: 'Scanner sc = new Scanner(System.in);\nString name = sc.nextLine();\nSystem.out.println(name);',
      operator: 'int total = theory + practical;\nSystem.out.println(total >= 35 ? "Pass" : "Fail");'
    },
    javascript: {
      first: 'console.log("KCDHANUNJAY INFOSYS");',
      variable: 'let marks = 95;\nconst course = "JavaScript";\nlet passed = true;',
      input: 'const name = prompt("Enter name");\nconsole.log("Student:", name);',
      operator: 'const total = theory + practical;\nconsole.log(total >= 35 ? "Pass" : "Fail");'
    }
  }[languageId];
  const title = language.title;
  const latestLanguageNotes = {
    c: {
      standard: 'C23 / ISO/IEC 9899:2024',
      current: 'Current C standard for modern C learning',
      focus: 'nullptr, binary literals, digit separators, improved enums, safer modern syntax basics'
    },
    cpp: {
      standard: 'C++26',
      current: 'Newest C++ standard generation after C++23',
      focus: 'Reflection, contracts, constexpr improvements, ranges, modules, modern STL practice'
    },
    java: {
      standard: 'Java 26 current release, Java 25 LTS',
      current: 'Java 26 for latest features, Java 25 for long-term support learning path',
      focus: 'Modern records, pattern matching, virtual threads, sequenced collections, streamlined beginner syntax'
    },
    javascript: {
      standard: 'ECMAScript 2025',
      current: 'Current JavaScript standard used with modern browsers and Node.js',
      focus: 'Iterator helpers, Promise.try, Set methods, RegExp.escape, JSON modules, modern async programming'
    }
  }[languageId];
  const operatorDocuments = {
    c: [
      ['1. Arithmetic Operators', 'Used for mathematical calculations.', [['+', 'Addition'], ['-', 'Subtraction'], ['*', 'Multiplication'], ['/', 'Division'], ['%', 'Modulus']], 'int arithmetic_example(int a, int b){\n    printf("Addition: %d\\n", a + b);\n    printf("Subtraction: %d\\n", a - b);\n    printf("Multiplication: %d\\n", a * b);\n    printf("Division: %d\\n", a / b);\n    printf("Modulus: %d\\n", a % b);\n    return 0;\n}\n\narithmetic_example(10, 3);', 'Arithmetic operators are used for marks totals, fee calculations, averages, and percentage programs.'],
      ['2. Relational Operators', 'Used to compare two values.', [['>', 'Greater than'], ['<', 'Less than'], ['>=', 'Greater than or equal'], ['<=', 'Less than or equal'], ['==', 'Equal'], ['!=', 'Not equal']], 'void relational_example(int marks){\n    printf("Pass: %d\\n", marks >= 35);\n    printf("Full Marks: %d\\n", marks == 100);\n    printf("Fail: %d\\n", marks < 35);\n}\n\nrelational_example(85);', 'Relational operators are used for pass/fail checking, age validation, and comparing student scores.'],
      ['3. Logical Operators', 'Used to combine conditions.', [['&&', 'True if both conditions are true'], ['||', 'True if any one condition is true'], ['!', 'Reverses condition result']], 'void logical_example(int marks, int attendance){\n    int eligible = marks >= 35 && attendance >= 75;\n    printf("Eligible: %d", eligible);\n}\n\nlogical_example(85, 90);', 'Logical operators are used for attendance eligibility, scholarship checks, and login validation.'],
      ['4. Assignment Operators', 'Used to assign or update values.', [['=', 'Assign'], ['+=', 'Add and assign'], ['-=', 'Subtract and assign'], ['*=', 'Multiply and assign'], ['/=', 'Divide and assign']], 'void assignment_example(int fee){\n    fee += 500;\n    printf("Updated Fee: %d", fee);\n}\n\nassignment_example(1500);', 'Assignment operators are used to update fees, marks, counters, and running totals.'],
      ['5. Increment and Decrement Operators', 'Used to increase or decrease a value by one.', [['++', 'Increment by 1'], ['--', 'Decrement by 1']], 'void increment_example(){\n    int count = 10;\n    count++;\n    printf("After increment: %d\\n", count);\n    count--;\n    printf("After decrement: %d", count);\n}\n\nincrement_example();', 'Increment and decrement operators are used in loops, counters, and attendance count programs.'],
      ['6. Bitwise Operators', 'Used to perform operations on binary values.', [['&', 'AND'], ['|', 'OR'], ['^', 'XOR'], ['~', 'NOT'], ['<<', 'Left shift'], ['>>', 'Right shift']], 'void bitwise_example(int a, int b){\n    printf("AND: %d\\n", a & b);\n    printf("OR: %d\\n", a | b);\n    printf("XOR: %d\\n", a ^ b);\n    printf("Left Shift: %d\\n", a << 1);\n    printf("Right Shift: %d", a >> 1);\n}\n\nbitwise_example(5, 3);', 'Bitwise operators are used in embedded systems, permissions, flags, and binary data handling.'],
      ['7. Conditional Operator', 'Used to write short if else decisions.', [['condition ? true_value : false_value', 'Short decision']], 'void conditional_example(int marks){\n    char result[] = marks >= 35 ? "Pass" : "Fail";\n    printf("Result: %s", result);\n}\n\nconditional_example(85);', 'The conditional operator is used for quick result status, grade labels, and simple decisions.'],
      ['8. Operator Precedence', 'Used to decide which operator runs first in an expression.', [['( )', 'Highest priority grouping'], ['*, /, %', 'Before addition and subtraction'], ['+, -', 'After multiplication/division'], ['Relational and logical', 'Used after arithmetic expressions']], 'void precedence_example(){\n    int result = 10 + 5 * 2;\n    int fixed = (10 + 5) * 2;\n    printf("Without brackets: %d\\n", result);\n    printf("With brackets: %d", fixed);\n}\n\nprecedence_example();', 'Operator precedence is used to avoid calculation mistakes in marks, billing, and formula programs.']
    ],
    cpp: [
      ['1. Arithmetic Operators', 'Used for mathematical calculations.', [['+', 'Addition'], ['-', 'Subtraction'], ['*', 'Multiplication'], ['/', 'Division'], ['%', 'Modulus']], 'int arithmeticExample(int a, int b){\n    cout << "Addition: " << a + b << endl;\n    cout << "Subtraction: " << a - b << endl;\n    cout << "Multiplication: " << a * b << endl;\n    cout << "Division: " << a / b << endl;\n    cout << "Modulus: " << a % b << endl;\n    return 0;\n}\n\narithmeticExample(10, 3);', 'Arithmetic operators are used for marks totals, fee calculations, averages, and percentage programs.'],
      ['2. Relational Operators', 'Used to compare two values.', [['>', 'Greater than'], ['<', 'Less than'], ['>=', 'Greater than or equal'], ['<=', 'Less than or equal'], ['==', 'Equal'], ['!=', 'Not equal']], 'void relationalExample(int marks){\n    cout << "Pass: " << (marks >= 35) << endl;\n    cout << "Full Marks: " << (marks == 100) << endl;\n    cout << "Fail: " << (marks < 35) << endl;\n}\n\nrelationalExample(85);', 'Relational operators are used for pass/fail checking, eligibility tests, and score comparison.'],
      ['3. Logical Operators', 'Used to combine conditions.', [['&&', 'True if both conditions are true'], ['||', 'True if any one condition is true'], ['!', 'Reverses condition result']], 'void logicalExample(int marks, int attendance){\n    bool eligible = marks >= 35 && attendance >= 75;\n    cout << "Eligible: " << eligible;\n}\n\nlogicalExample(85, 90);', 'Logical operators are used for attendance eligibility, login validation, and project conditions.'],
      ['4. Assignment Operators', 'Used to assign or update values.', [['=', 'Assign'], ['+=', 'Add and assign'], ['-=', 'Subtract and assign'], ['*=', 'Multiply and assign'], ['/=', 'Divide and assign']], 'void assignmentExample(int fee){\n    fee += 500;\n    cout << "Updated Fee: " << fee;\n}\n\nassignmentExample(1500);', 'Assignment operators are used to update fees, marks, counters, and totals.'],
      ['5. Increment and Decrement Operators', 'Used to increase or decrease a value by one.', [['++', 'Increment by 1'], ['--', 'Decrement by 1']], 'void incrementExample(){\n    int count = 10;\n    count++;\n    cout << "After increment: " << count << endl;\n    count--;\n    cout << "After decrement: " << count;\n}\n\nincrementExample();', 'Increment and decrement operators are used in loops, counters, and menu-driven programs.'],
      ['6. Bitwise Operators', 'Used to perform operations on binary values.', [['&', 'AND'], ['|', 'OR'], ['^', 'XOR'], ['~', 'NOT'], ['<<', 'Left shift'], ['>>', 'Right shift']], 'void bitwiseExample(int a, int b){\n    cout << "AND: " << (a & b) << endl;\n    cout << "OR: " << (a | b) << endl;\n    cout << "XOR: " << (a ^ b) << endl;\n    cout << "Left Shift: " << (a << 1) << endl;\n    cout << "Right Shift: " << (a >> 1);\n}\n\nbitwiseExample(5, 3);', 'Bitwise operators are used in system programming, flags, permissions, and binary logic.'],
      ['7. Conditional Operator', 'Used to write short if else decisions.', [['condition ? true_value : false_value', 'Short decision']], 'void conditionalExample(int marks){\n    string result = marks >= 35 ? "Pass" : "Fail";\n    cout << "Result: " << result;\n}\n\nconditionalExample(85);', 'The conditional operator is used for quick result display, grade status, and simple decisions.'],
      ['8. Scope Resolution Operator', 'Used to access global variables, class members, and namespace members.', [['::', 'Scope resolution']], 'int marks = 100;\n\nvoid scopeExample(){\n    int marks = 85;\n    cout << "Local Marks: " << marks << endl;\n    cout << "Global Marks: " << ::marks;\n}\n\nscopeExample();', 'Scope resolution is used in class programs, namespace usage, and avoiding name conflicts.']
    ],
    java: [
      ['1. Arithmetic Operators', 'Used for mathematical calculations.', [['+', 'Addition'], ['-', 'Subtraction'], ['*', 'Multiplication'], ['/', 'Division'], ['%', 'Modulus']], 'static void arithmeticExample(int a, int b){\n    System.out.println("Addition: " + (a + b));\n    System.out.println("Subtraction: " + (a - b));\n    System.out.println("Multiplication: " + (a * b));\n    System.out.println("Division: " + (a / b));\n    System.out.println("Modulus: " + (a % b));\n}\n\narithmeticExample(10, 3);', 'Arithmetic operators are used for marks totals, fee calculations, averages, and percentage programs.'],
      ['2. Relational Operators', 'Used to compare two values.', [['>', 'Greater than'], ['<', 'Less than'], ['>=', 'Greater than or equal'], ['<=', 'Less than or equal'], ['==', 'Equal'], ['!=', 'Not equal']], 'static void relationalExample(int marks){\n    System.out.println("Pass: " + (marks >= 35));\n    System.out.println("Full Marks: " + (marks == 100));\n    System.out.println("Fail: " + (marks < 35));\n}\n\nrelationalExample(85);', 'Relational operators are used for pass/fail checking, validation, and score comparison.'],
      ['3. Logical Operators', 'Used to combine conditions.', [['&&', 'True if both conditions are true'], ['||', 'True if any one condition is true'], ['!', 'Reverses condition result']], 'static void logicalExample(int marks, int attendance){\n    boolean eligible = marks >= 35 && attendance >= 75;\n    System.out.println("Eligible: " + eligible);\n}\n\nlogicalExample(85, 90);', 'Logical operators are used for attendance eligibility, login validation, and multi-condition checks.'],
      ['4. Assignment Operators', 'Used to assign or update values.', [['=', 'Assign'], ['+=', 'Add and assign'], ['-=', 'Subtract and assign'], ['*=', 'Multiply and assign'], ['/=', 'Divide and assign']], 'static void assignmentExample(int fee){\n    fee += 500;\n    System.out.println("Updated Fee: " + fee);\n}\n\nassignmentExample(1500);', 'Assignment operators are used to update fees, marks, counters, and totals.'],
      ['5. Unary Operators', 'Used with one operand.', [['++', 'Increment'], ['--', 'Decrement'], ['+', 'Positive value'], ['-', 'Negative value'], ['!', 'Logical NOT']], 'static void unaryExample(){\n    int count = 10;\n    count++;\n    System.out.println("After increment: " + count);\n    count--;\n    System.out.println("After decrement: " + count);\n}\n\nunaryExample();', 'Unary operators are used in loops, counters, negative values, and condition reversal.'],
      ['6. Bitwise Operators', 'Used to perform operations on binary values.', [['&', 'AND'], ['|', 'OR'], ['^', 'XOR'], ['~', 'NOT'], ['<<', 'Left shift'], ['>>', 'Right shift']], 'static void bitwiseExample(int a, int b){\n    System.out.println("AND: " + (a & b));\n    System.out.println("OR: " + (a | b));\n    System.out.println("XOR: " + (a ^ b));\n    System.out.println("Left Shift: " + (a << 1));\n    System.out.println("Right Shift: " + (a >> 1));\n}\n\nbitwiseExample(5, 3);', 'Bitwise operators are used in flags, permissions, binary values, and low-level calculations.'],
      ['7. Ternary Operator', 'Used to write short if else decisions.', [['condition ? true_value : false_value', 'Short decision']], 'static void ternaryExample(int marks){\n    String result = marks >= 35 ? "Pass" : "Fail";\n    System.out.println("Result: " + result);\n}\n\nternaryExample(85);', 'The ternary operator is used for quick result status, grade labels, and simple decisions.'],
      ['8. instanceof Operator', 'Used to check whether an object belongs to a class or interface.', [['object instanceof ClassName', 'Checks object type']], 'static void instanceofExample(Object data){\n    System.out.println("Is String: " + (data instanceof String));\n}\n\ninstanceofExample("KCDHANUNJAY INFOSYS");', 'The instanceof operator is used in object-oriented programs, form data handling, and safe type checking.']
    ],
    javascript: [
      ['1. Arithmetic Operators', 'Used for mathematical calculations.', [['+', 'Addition'], ['-', 'Subtraction'], ['*', 'Multiplication'], ['/', 'Division'], ['%', 'Modulus'], ['**', 'Power']], 'function arithmeticExample(a, b) {\n    console.log("Addition:", a + b);\n    console.log("Subtraction:", a - b);\n    console.log("Multiplication:", a * b);\n    console.log("Division:", a / b);\n    console.log("Modulus:", a % b);\n    console.log("Power:", a ** b);\n}\n\narithmeticExample(10, 3);', 'Arithmetic operators are used for marks totals, bill amounts, averages, and percentage calculations.'],
      ['2. Comparison Operators', 'Used to compare two values.', [['>', 'Greater than'], ['<', 'Less than'], ['>=', 'Greater than or equal'], ['<=', 'Less than or equal'], ['==', 'Equal after conversion'], ['===', 'Strict equal'], ['!=', 'Not equal'], ['!==', 'Strict not equal']], 'function comparisonExample(marks) {\n    console.log("Pass:", marks >= 35);\n    console.log("Full Marks:", marks === 100);\n    console.log("Fail:", marks < 35);\n}\n\ncomparisonExample(85);', 'Comparison operators are used for form validation, pass/fail checks, and UI decisions.'],
      ['3. Logical Operators', 'Used to combine conditions.', [['&&', 'True if both conditions are true'], ['||', 'True if any one condition is true'], ['!', 'Reverses condition result']], 'function logicalExample(marks, attendance) {\n    const eligible = marks >= 35 && attendance >= 75;\n    console.log("Eligible:", eligible);\n}\n\nlogicalExample(85, 90);', 'Logical operators are used for login validation, button conditions, filters, and eligibility checks.'],
      ['4. Assignment Operators', 'Used to assign or update values.', [['=', 'Assign'], ['+=', 'Add and assign'], ['-=', 'Subtract and assign'], ['*=', 'Multiply and assign'], ['/=', 'Divide and assign']], 'function assignmentExample(fee) {\n    fee += 500;\n    console.log("Updated Fee:", fee);\n}\n\nassignmentExample(1500);', 'Assignment operators are used to update totals, counters, cart values, and student records.'],
      ['5. Ternary Operator', 'Used to write short if else decisions.', [['condition ? true_value : false_value', 'Short decision']], 'function ternaryExample(marks) {\n    const result = marks >= 35 ? "Pass" : "Fail";\n    console.log("Result:", result);\n}\n\nternaryExample(85);', 'The ternary operator is used for status badges, grade display, and quick UI messages.'],
      ['6. Type Operators', 'Used to check value type and object relationship.', [['typeof', 'Checks data type'], ['instanceof', 'Checks object type']], 'function typeExample(value) {\n    console.log("Type:", typeof value);\n    console.log("Is Array:", value instanceof Array);\n}\n\ntypeExample([10, 20, 30]);', 'Type operators are used in form validation, API data checks, and debugging.'],
      ['7. Membership / Property Operators', 'Used to check whether a property exists in an object.', [['in', 'Property exists in object'], ['?.', 'Optional chaining for safe access']], 'function membershipExample(student) {\n    console.log("Has course:", "course" in student);\n    console.log("Mobile:", student.contact?.mobile);\n}\n\nmembershipExample({ name: "Ravi", course: "Python" });', 'Membership and property operators are used for checking object data from forms, APIs, and student records.'],
      ['8. Spread Operator', 'Used to expand arrays or objects.', [['...', 'Spread or copy values']], 'function spreadExample(courses) {\n    const updatedCourses = [...courses, "Python"];\n    console.log(updatedCourses);\n}\n\nspreadExample(["C", "Java"]);', 'The spread operator is used for copying arrays, updating objects, and handling frontend state without changing original data.']
    ]
  }[languageId].flatMap(([heading, description, rows, code, usage]) => [
    { type: 'heading', text: heading },
    { type: 'paragraph', text: description },
    { type: 'table', rows: [['Operator', 'Meaning'], ...rows] },
    { type: 'code', text: code },
    { type: 'paragraph', text: `Real-time Usage: ${usage}` }
  ]);
  return [languageId, {
    introduction: [
      { type: 'heading', text: `${title} Programming Introduction` },
      { type: 'paragraph', text: `${title} is introduced as a programming language for writing instructions, solving problems, and building real-time applications. This topic covers language history, features, uses, first program, and practical applications.` },
      { type: 'heading', text: 'Latest Update' },
      { type: 'table', rows: [
        ['Item', 'Details'],
        ['Latest standard / version', latestLanguageNotes.standard],
        ['Learning path', latestLanguageNotes.current],
        ['Modern focus', latestLanguageNotes.focus]
      ] },
      { type: 'heading', text: 'First Program' },
      { type: 'code', text: samples.first },
      { type: 'heading', text: 'Applications' },
      { type: 'list', items: ['Student record programs', 'Marks calculation', 'Menu-driven lab programs', 'Mini projects', 'Interview basics'] },
      { type: 'paragraph', text: `Real-time Usage: KCDHANUNJAY INFOSYS students can use ${title} basics to understand program flow before building larger projects.` }
    ],
    'basic-structure': [
      { type: 'heading', text: `${title} Basic Program Structure` },
      { type: 'paragraph', text: `A ${title} program has a fixed structure. Understanding each section helps students write neat lab programs and project files.` },
      { type: 'table', rows: [
        ['Section', 'Purpose'],
        ['Documentation', 'Explains program name, author, date, and purpose.'],
        ['Library / Import Section', 'Adds built-in functions and classes required by the program.'],
        ['Declaration Section', 'Creates variables, constants, or objects required for processing.'],
        ['Main / Execution Section', 'Contains the statements that run the program.'],
        ['Function Section', 'Keeps reusable logic in separate blocks.'],
        ['Output Section', 'Displays final result to the user.']
      ] },
      { type: 'heading', text: 'Example Structure' },
      { type: 'code', text: samples.first },
      { type: 'paragraph', text: 'Real-time Usage: This structure is useful for calculator, result, attendance, and student verification mini projects.' }
    ],
    tokens: [
      { type: 'heading', text: `${title} Tokens` },
      { type: 'paragraph', text: `Tokens are the smallest meaningful units of a ${title} program. A compiler/interpreter reads code as tokens.` },
      { type: 'table', rows: [
        ['Token Type', 'Meaning', 'Examples'],
        ['Keywords', 'Reserved words with predefined meaning', 'if, else, for, while, return'],
        ['Identifiers', 'Names of variables, functions, classes, or objects', 'marks, total, Student'],
        ['Literals / Constants', 'Fixed values used in code', '10, 95.5, "KCD"'],
        ['Operators', 'Symbols used for operations', '+, -, *, /, ==, &&'],
        ['Special Symbols', 'Symbols used to group or separate code', '( ), { }, [ ], ;, comma']
      ] },
      { type: 'code', text: samples.variable },
      { type: 'paragraph', text: 'Real-time Usage: Tokens help students identify syntax errors and understand how programs are built.' }
    ],
    variables: [
      { type: 'heading', text: `${title} Variables` },
      { type: 'paragraph', text: `Variables are names used to store data. They hold values such as student name, marks, course, status, and totals.` },
      { type: 'heading', text: 'Example' },
      { type: 'code', text: samples.variable },
      { type: 'table', rows: [
        ['Rule', 'Meaning'],
        ['Meaningful names', 'Use names like studentName, marks, total, course.'],
        ['No spaces', 'Variable names should not contain spaces.'],
        ['Case-sensitive', 'marks and Marks can be different identifiers.'],
        ['Correct type/value', 'Choose suitable type/value for the data being stored.']
      ] },
      { type: 'paragraph', text: 'Real-time Usage: Variables store student UID, marks, fee, course, and verification status.' }
    ],
    keywords: [
      { type: 'heading', text: `${title} Keywords` },
      { type: 'paragraph', text: `Keywords are reserved words. They have predefined meaning and cannot be used as ordinary variable names.` },
      { type: 'table', rows: [
        ['Keyword Group', 'Examples', 'Use'],
        ['Decision', 'if, else, switch', 'Select one path based on condition.'],
        ['Loop', 'for, while, do', 'Repeat statements.'],
        ['Function / Method', 'return, void, def/function style words', 'Create reusable logic.'],
        ['Class / Object', 'class, public, private, new', 'Build object-oriented programs where supported.'],
        ['Error handling', 'try, catch/except, finally', 'Handle runtime errors safely.']
      ] },
      { type: 'paragraph', text: 'Real-time Usage: Keywords are used in every program for conditions, loops, functions, classes, and error handling.' }
    ],
    datatypes: [
      { type: 'heading', text: `${title} Datatypes` },
      { type: 'paragraph', text: `Datatypes describe what kind of value can be stored and processed in a program.` },
      { type: 'table', rows: [
        ['Data Type Idea', 'Purpose', 'Example Use'],
        ['Whole number', 'Stores count, UID, age, marks', 'student count, total marks'],
        ['Decimal number', 'Stores percentage, fee, average', 'percentage calculation'],
        ['Character / String', 'Stores text', 'student name, course name'],
        ['Boolean', 'Stores true/false status', 'passed, verified'],
        ['Collection / Object', 'Stores multiple values', 'student list, record object']
      ] },
      { type: 'code', text: samples.variable },
      { type: 'paragraph', text: 'Real-time Usage: Datatypes help store student records correctly and avoid calculation mistakes.' }
    ],
    'input-output': [
      { type: 'heading', text: `${title} Input Output` },
      { type: 'paragraph', text: 'Input means taking data from the user. Output means displaying data or result.' },
      { type: 'heading', text: 'Example' },
      { type: 'code', text: samples.input },
      { type: 'table', rows: [
        ['Operation', 'Purpose'],
        ['Input', 'Collect student name, UID, marks, or course.'],
        ['Processing', 'Calculate total, percentage, or status.'],
        ['Output', 'Display result, receipt, or message.'],
        ['Formatted Output', 'Show clean reports and tables.']
      ] },
      { type: 'paragraph', text: 'Real-time Usage: Input/output is used in admission forms, result programs, and mini project dashboards.' }
    ],
    operators: [
      { type: 'heading', text: `${title} Operators` },
      { type: 'paragraph', text: `${title} operators are symbols or special words used to perform operations on values and variables. They help calculate values, compare data, combine conditions, update variables, and make decisions in programs.` },
      ...operatorDocuments
    ]
  }];
}));

window.KCD_LANGUAGE_SYLLABI = Object.fromEntries(Object.entries(languageConfigs).map(([id, language]) => [id, {
  title: language.title,
  syllabusTitle: language.syllabusTitle,
  topics: language.topics.map(([topicId, title, subtopics]) => ({
    id: topicId,
    title,
    subtopics: subtopics.map((subtopic) => detailFor(language, { id: topicId, title }, subtopic)),
    extras: id === 'python'
      ? { ...pythonTopicExtras[topicId], documentBlocks: pythonCompleteDocumentBlocks[topicId] || null }
      : id === 'c' ? null : firstEightTopicDocuments[id]?.[topicId] ? { documentBlocks: firstEightTopicDocuments[id][topicId] } : null
  }))
}]));
window.KCD_C_LANGUAGE_SYLLABUS = window.KCD_LANGUAGE_SYLLABI.c.topics;
